import React from 'react';
import style from './Header.module.css';
import moment from 'moment';
import cx from 'classnames';

const getOtherUser = (users, mainUserId) => {
    return users.filter(u => u.id !== mainUserId).pop();
}

const Header = ({user, status, timestamp}) => {

    return (
        <div className={cx(style.header)}>
        <div className={cx(style.status)}>
            <div className={cx()}>19:05</div>
        </div>
        <div className={cx(style.details)}>
            <div className={cx(style.avatar)} style={{backgroundImage:`url(${user.avatar})`}}></div>
            <p className={cx(style.title)}>{user.name}</p>
            <p className={cx(style.lastSeen)}>last seen yesterday</p>

        </div>
        </div>
    );
};

export default Header;
