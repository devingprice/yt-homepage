import React, { Component } from 'react';
import './channelHeader.css';
import logo from './logo.svg';

class ChannelHeader extends Component {
    render() {
        return (
            <header className="channel-header">
                <div className="channel-banner">
                    <img src={logo} className="channel-logo" alt="logo" />
                    <h1 className="channel-title">Welcome to React</h1>
                </div>

                <div className="channel-info"></div>
            </header>
        )
    }
}
export default ChannelHeader;