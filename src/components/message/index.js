import React from 'react';
import style from './Message.module.css';

import cx from 'classnames';

const Message = ({entry, users, mainUserId}) => {
    const u = users[entry.uid - 1]; // sorry
    const isMain = u.id === mainUserId;
        return (
            <div className={cx(style.bobble, {[style.mainUser]: isMain})}>
                <div className={style.boobleInner}>
                    <div>
                        {entry.content.data}
                    </div>
                </div>
            </div>
        );
};

export default Message;
