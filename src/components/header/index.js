import React from 'react';
import style from './Header.module.css';
import moment from 'moment';
import cx from 'classnames';

const getOtherUser = (users, mainUserId) => {
    return users.filter(u => u.id !== mainUserId).pop();
}

const Header = ({users, mainUserId, entries}) => {

    if (entries.length === 0) {
        return null;
    }
    const u = getOtherUser(users, mainUserId);
    const entriesfromOtherUser = entries.filter(e => e.uid == u.id);
    const lastEntry = entries.length > 0 ? entries[entries.length -1] : '';
    const lastEntryFromOtherUser = entriesfromOtherUser.length > 0 ? entriesfromOtherUser[entriesfromOtherUser.length -1] : false;
    const currentTime = lastEntry.timestamp;
    const otherUserLastVisit = lastEntryFromOtherUser.timestamp;


    const end = moment.unix(otherUserLastVisit);
    const start = moment.unix(currentTime);
    const duration = moment.duration(start.diff(end));
    let otherUserStatus = '';
    if (duration.minutes() <= 3) {
        otherUserStatus = 'online';
    } else if (otherUserLastVisit) {
        otherUserStatus = `last seen ${moment.duration(start.diff(end)).humanize()}`;
    } else {
        otherUserStatus = 'last seen yesterday';
    }

    return (
        <div className={cx(style.header)}>
        <div className={cx(style.status)}>
            <div className={cx()}>{moment.unix(currentTime).format("HH:mm")}</div>
        </div>
        <div className={cx(style.details)}>
            <div className={cx(style.avatar)} style={{backgroundImage:`url(${u.avatar})`}}></div>
            <p className={cx(style.title)}>{u.name}</p>
            <p className={cx(style.lastSeen)}>{otherUserStatus}</p>

        </div>
        </div>
    );
};

export default Header;
