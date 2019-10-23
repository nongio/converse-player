import React from 'react';
import style from './Header.module.css';
import moment from 'moment';
import cx from 'classnames';


const Header = ({user, status, timestamp}) => {

    return (
        <div className={cx(style.header)}>
        <div className={cx(style.status)}>
            <div className={cx()}>{moment.unix(timestamp).format("HH:mm")}</div>
        </div>
        <div className={cx(style.details)}>
            <div className={cx(style.avatar)} style={{backgroundImage:`url(${user.avatar})`}}></div>
            <p className={cx(style.title)}>{user.name}</p>
            <p className={cx(style.lastSeen)}>{status}</p>

        </div>
        </div>
    );
};

export default Header;
