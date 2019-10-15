import React from 'react';
import style from './Timeline.module.css';
import cx from 'classnames';
import Message from '../message';

const renderEntry = ( entry, users, mainUserId ) => {
    switch(entry.type) {
        case 'message':
            const props = {
                entry,
                users,
                mainUserId,
            };
            return <Message {...props} />;
            break;
        case 'context':
            return (
                <div className={style.caption}>
                    <div className={style.captionInner}>
                    {entry.description}
                    </div>
                </div>
            );
            break;
    }
};

const Timeline = ({entries, users, mainUserId}) => {

    return (
        <div className={style.main}>
            {entries.map(e=>renderEntry(e, users, mainUserId))}
        </div>
            );
}

export default Timeline;

