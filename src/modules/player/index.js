export default class Player{
  constructor(actorId, timeline){
    this._eventHandlers = new Map();
    this._actorId = actorId;
    [this._nextMessage, this._timeline] = this._flattenTimeline(timeline);
    this._playState = 0;
  }

  play(){
    this._playState = 1;
    this.playFrom(this._nextMessage);
  }

  pause(){
    this._playState = 0;
  }

  playFrom(entryId){
    if(this._playState === 1 && !!this._nextMessage){
      const message = this._timeline.get(this._nextMessage);
      this.dispatch(message);
    }
  }

  dispatch(message){
    if(message.type === 'context'){
      this.switchContext(message);
    }
    else if(parseInt(message.uid) === this._actorId){
      this.send(message, message.delay);
    }
    else{
      this.receive(message, message.delay);
    }
  }

  send(message,delay=500){
    setTimeout(() => {
      this._typeMessage(message.content.data)
      .then(() => {
        this.emit('send', [message]);
        this._setNextMessage();
        this.playFrom(this._nextMessage);
      });
    },delay);
  }

  receive(message,delay=500){
    setTimeout(() => {
      this._bufferMessage()
      .then(() => {
        this.emit('receive', [message]);
        this._setNextMessage();
        this.playFrom(this._nextMessage);
      })
    },delay);
  }

  switchContext(context){
    this.emit('context-changed', [context]);
    this._setNextMessage();
    this.playFrom(this._nextMessage);
  }

  on(event, callback){
    if(!this._eventHandlers.has(event)){
      this._eventHandlers.set(event,[]);
    }

    return this._eventHandlers.get(event).push(callback); 
  }

  off(event, callback){
    const filteredHandlers = this._eventHandlers.get(event)
      .filter(handler => {
        return handler !== callback;
      });

    this._eventHandlers.set(event,filteredHandlers);
  }

  emit(event,payload){
    const handlers = this._eventHandlers.get(event);
    handlers.forEach(handler => {
      handler.apply(null,payload);
    });
  }

  _typeMessage(text){
    return new Promise(resolve => {
      let letterIndex = 0;
      const intervalRef = setInterval(() => {
        if(letterIndex === text.length){
          clearInterval(intervalRef);
          resolve();
        }

        this.emit('text-input', [text[letterIndex]]);
        letterIndex++;
      },90)
    })
  }

  _bufferMessage(duration = 3000){
    return new Promise(resolve => {
      this.emit('incoming');
      setTimeout(resolve, duration);
    })
  }

  _setNextMessage(){
    const keys = Array.from(this._timeline.keys());
    const nextKeyIndex = (keys.indexOf(this._nextMessage) + 1);
    if(nextKeyIndex < keys.length){
      this._nextMessage = keys[nextKeyIndex];
    }else{
      this._nextMessage = null;
    }
  }

  _flattenTimeline(timeline){
    const flatTimeline = new Map();
    for(const entry of timeline){
      flatTimeline.set(entry.timestamp,entry);
    }

    return [
      timeline[0].timestamp,
      flatTimeline
    ]
  }
}

Player.prototype.events = [
  'send','receive','context-changed','text-input','incoming'
]