import React, { Component } from 'react';
import './channelDrawer.scss';

const ChannelPill = (name, updates, url, key) => {
    return (
        <a title={name} className="channel-pill" key={key}>
            <div className="channel-pill__icon">
                <img alt="" height="24" width="24" src={url} />
            </div>
            <div className="channel-pill__Name">{name}</div>
            <div className="channel-pill__updates">{updates}</div>
        </a>
    )
}

export default ChannelPill;