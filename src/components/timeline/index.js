import React from 'react';
import style from './Timeline.module.css';
import cx from 'classnames';

const renderEntry = ( entry, users, mainUserId ) => {
    switch(entry.type) {
        case 'message':
            const u = users[entry.uid - 1]; // sorry
        const isMain = u.id === mainUserId;
            return (
                <div className={cx(style.bobble, {[style.mainUser]: isMain})}>
                    <div className={style.boobleInner}>
                        {!isMain && <div className={style.username}>
                            {u.name}
                        </div>}
                        <div>
                            {entry.content.data}
                        </div>
                    </div>
                </div>
            );
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

