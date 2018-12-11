import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import './channelDrawer.scss';
import ChannelItem from './channelItem';

//styles 
const Wrapper = styled('div')`
    
`;
const Container = styled('div')`
    
`;
const DropZone = styled('div')`
    
`;

class InnerQuoteList extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.quotes !== this.props.quotes) {
            return true;
        }
        return false;
    }
    render() {
        return this.props.quotes.map((quote, index) => (
            <ChannelItem quote={quote} index={index}/>
        ));
    }
}

//DnD droppable
class Panel extends Component {
    static defaultProps = {
        listId: 'LIST'
    };
    render() {
        const {
            ignoreContainerClipping,
            isCombineEnabled,
            style,
            quotes,
            title
        } = this.props;

        return (

            <Droppable
                droppableId="PANEL"
                type="Quote"
                ignoreContainerClipping={ignoreContainerClipping}
                isDropDisabled={true}
                isCombineEnabled={isCombineEnabled}>
                {(dropProvided, dropSnapshot) => (
                    <Wrapper
                        style={style}
                        isDraggingOver={dropSnapshot.isDraggingOver}
                        {...dropProvided.droppableProps}>

                        <div className="drawer__Title">
                            <h3>SUBSCRIPTIONS</h3>
                        </div>
                        <DropZone ref={dropProvided.innerRef}>
                            <div className="drawer__Channels">
                                <InnerQuoteList quotes={quotes} />
                                {dropProvided.placeholder}
                            </div>
                        </DropZone>

                    </Wrapper>
                )}
            </Droppable>
        );
    }
}

const mapStateToProps = state => {
    return {
        quotes: state.panel.quotes //state.panel.quotes
    };
};

export default connect(mapStateToProps,
    null)(Panel);


//export default ChannelDrawer;

//import { channels } from '../../data';
//import ChannelPill from './channelPill';
/*
const channels = [
    {
        "name": "Philip DeFranco",
        "updates": "3",
        "url": "https://yt3.ggpht.com/a-/AN66SAxggAEBzd8inE9QfOrLK5vJkMYtOxAp5SpaGA=s88-mo-c-c0xffffffff-rj-k-no"
    },
    {
        "name": "Mental Massage",
        "updates": "5",
        "url": "https://yt3.ggpht.com/a-/AN66SAxPSAqx9N2Xvy16OzcXzSDXf7tuV8J3lNvzGw=s88-mo-c-c0xffffffff-rj-k-no"
    },
    {
        "name": "Boho Beautiful",
        "updates": "3",
        "url": "https://yt3.ggpht.com/a-/AN66SAyPBJ4PC0uuKcQxJNrI55rK3NHA9uG1Aw6d7A=s88-mo-c-c0xffffffff-rj-k-no"
    },
    {
        "name": "truTV",
        "updates": "15",
        "url": "https://yt3.ggpht.com/a-/AN66SAxWasmj37V2WIOFuVg9CiIrBINYR3woLGEV2A=s88-mo-c-c0xffffffff-rj-k-no"
    },
    {
        "name": "TechLead",
        "updates": "1",
        "url": "https://yt3.ggpht.com/a-/AN66SAxrpBvKevdI-noo6A9-5WT7vTQwxNDwcrC9vw=s88-mo-c-c0xffffffff-rj-k-no"
    },
    {
        "name": "The Infographics Show",
        "updates": "16",
        "url": "https://yt3.ggpht.com/a-/AN66SAzwZsCNSyRezNFqEaG6Ef9bFcZ-PzN6CxSzEw=s88-mo-c-c0xffffffff-rj-k-no"
    },
    {
        "name": "SophieMichelle ASMR",
        "updates": "2",
        "url": "https://yt3.ggpht.com/a-/AN66SAwR6U1isIWkp5-wqJMgojNLvO5pXcVeAJaIBw=s88-mo-c-c0xffffffff-rj-k-no"
    }
]*/