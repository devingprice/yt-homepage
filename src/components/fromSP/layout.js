import React, { Component } from 'react';
import './layout.scss';

import ChannelDrawer from './channelDrawer';
import Bookcase from './bookcase';
import DragDropContextWrapper from './DragDropContextWrapper'

class Layout extends Component {
    render() {
        return (
            <div className="gridWrapper">
                <DragDropContextWrapper>
                    <div className="headerControls">Header</div>
                    <div className="channelDrawer">
                        <ChannelDrawer />
                    </div>
                    <div className="bodyContent">
                        <Bookcase />
                    </div>
                </DragDropContextWrapper>
            </div>
        );
    }
}

export default Layout;
