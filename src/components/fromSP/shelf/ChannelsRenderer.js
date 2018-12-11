import React, { Component } from 'react';
import '../bookcase.scss';

import ChannelPill from '../channelDrawer/channelPill';

class ChannelsRenderer extends Component {
    render() {
        let channels = this.props.channels;
        return (
            <div className="channelsRenderer">
                {
                    channels.map((channelItem, index) => ChannelPill(channelItem.name, "X", channelItem.url, index))
                }
            </div>
        )
    }
}

export default ChannelsRenderer;