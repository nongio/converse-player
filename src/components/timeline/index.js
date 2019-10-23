import React from 'react';
import style from './Timeline.module.css';
import Message from '../message';

const renderEntry = entry => {
  if(entry.type === 'context'){
    return (
      <div className={style.caption}>
          <div className={style.captionInner}>
          {entry.description}
          </div>
      </div>
    );
  }

  return renderMessage(entry);
}

function renderMessage(entry) {
  return (<Message text={entry.message} align={entry.align} />);
}

const Timeline = ({entries, isBuffering, inputText}) => {
  return (
    <div className={style.main}>
      <div className={style.messageWindow}>
        {entries.map(renderEntry)}
        {isBuffering ? renderBufferMessage() : null}
      </div>   
      <div className={style.inputBox}> 
        <p>{inputText}</p>
        <button type='button'>send</button>
      </div> 
    </div>
  );
}

function renderBufferMessage(){
  return <Message text={
      <>
      <span className={style.loader}/>
      <span className={style.loader}/>
      <span className={style.loader}/>
      </>
      }
  />
}

export default Timeline;
