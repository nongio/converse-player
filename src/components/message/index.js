import React from 'react';
import style from './Message.module.css';
import cx from 'classnames';

const Message = ({text, align}) => {
  if(text === ''){
    return null;
  }
  return (
      <div className={cx(style.bobble, {[style.mainUser]: align === 'right'})}>
          <div className={style.boobleInner}>
              <div>
                  {text}
              </div>
          </div>
      </div>
  );
};

export default Message;
