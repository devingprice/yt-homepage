import React, { Component } from 'react';
import './layout.scss';

import ChannelDrawer from '../channelDrawer';
import Bookcase from '../bookcase';
import DragDropContextWrapper from '../DragDropContextWrapper'
import Toggles from '../toggles';

class Layout extends Component {
    render() {
        return (
            <div className="gridWrapper">
                <DragDropContextWrapper>
                    <div className="headerControls">
                        <Toggles/>
                    </div>
                    <div className="channelDrawer">
                        <ChannelDrawer />
                    </div>
                    <div className="bodyContent">
                        <Bookcase loggedIn={this.props.loggedIn} />
                    </div>
                </DragDropContextWrapper>
            </div>
        );
    }
}

export default Layout;
