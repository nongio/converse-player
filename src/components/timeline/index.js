import React, {useState,useEffect} from 'react';
import style from './Timeline.module.css';
import Message from '../message';

const renderEntry = ( entry, users, mainUserId ) => {
  if(entry.type === 'context'){
    return (
      <div className={style.caption}>
          <div className={style.captionInner}>
          {entry.description}
          </div>
      </div>
    );
  }

  const isMain = isMainUser(entry.uid,mainUserId,users)
  return renderMessage(entry, isMain);
}

function renderMessage(entry, isMain) {
  if(isMain){
    return renderMainUserMessage(entry);
  }

  return renderSecondaryUserMessage(entry);
}

function isMainUser(userId,mainId,users){
  const u = users[userId - 1];
  return u.id === mainId;
}

function renderMainUserMessage(entry){
  return <Message entry={entry} isMain />
}

function renderSecondaryUserMessage(entry){
  return <Message entry={entry} isMain={false} />
}

function renderInputField(entry,mainUserId,users, updater, next){
  const props = {
    message: null,
    onSend:updater
  };
  if(!entry || entry.type === 'context'){
    return <InputBox {...props} />
  }
  if(isMainUser(entry.uid,mainUserId,users)){
    props.message = entry.content.data
  }
  return <InputBox {...props} />
}

function InputBox({message,onSend}){
  const [typedLetters, updateTypedLetters] = useState('');
  const [typedIndex, updateTypedIndex] = useState(0);
  useEffect(() => {
    if(!message){
      return updateTypedIndex(0);
    }
    setTimeout(() => {
      if(typedIndex === message.length){
        updateTypedLetters('');
        return onSend();
      }

      updateTypedLetters(typedLetters + message[typedIndex]);
      updateTypedIndex(typedIndex+1);
    },80);

  },[typedIndex, message]);
  
  return  (<div className={style.inputBox}> 
    <p>{typedLetters}</p>
    <button type='button'>send</button>
    </div>
  );

}

const Timeline = ({entries, users, mainUserId,update, nextMessage}) => {
   const [shouldShowBuffer, updateShouldShowBuffer] = useState(false);
    useEffect(() => {
      if(nextMessage){
        if(nextMessage.type === 'context'){
          return update();
        }

        if(!isMainUser(nextMessage.uid,mainUserId,users)){
          setTimeout(() => {
            updateShouldShowBuffer(true);
            setTimeout(() => {
              updateShouldShowBuffer(false);//updateShouldShowBuffer(false);
              update();
            },2500);
          },3000); 
        }   
    }
    },[nextMessage]);

    return (
        <div className={style.main}>
            <div className={style.messageWindow}>
            {entries.map(e=>renderEntry(e, users, mainUserId, update))}
            {shouldShowBuffer ? renderBufferMessage() : null}
            </div>   
            {renderInputField(nextMessage,mainUserId,users, update, nextMessage)}     
        </div>
            );
}

function renderBufferMessage(){
  return <Message entry={{content:{data:
      <>
      <span className={style.loader}/>
      <span className={style.loader}/>
      <span className={style.loader}/>
      </>
      }}} 
  />
}

export default Timeline;

