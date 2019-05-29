import React from 'react';

import './channelItem.scss'

const ChannelPill = (name, updates, url, key) => {
    return (
        <div title={name} className="channel-pill" key={key}>
            <div className="channel-pill__icon">
                <img alt="" height="24" width="24" src={url} />
            </div>
            <div className="channel-pill__Name">{name}</div>
            <div className="channel-pill__updates">{updates}</div>
        </div>
    )
}

export default ChannelPill;