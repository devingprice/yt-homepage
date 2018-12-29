import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import './channelDrawer.scss';
import ChannelItem from '../ChannelItem/channelItem';


class InnerQuoteList extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.quotes !== this.props.quotes) {
            return true;
        }
        return false;
    }
    render() {
        return this.props.quotes.map((quote, index) => (
            <ChannelItem key={"channelDrawer-"+index} quote={quote} index={index}/>
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
            //title
        } = this.props;

        return (

            <Droppable
                droppableId="PANEL"
                type="Quote"
                ignoreContainerClipping={ignoreContainerClipping}
                isDropDisabled={true}
                isCombineEnabled={isCombineEnabled}>
                {(dropProvided, dropSnapshot) => (
                    <div //Wrapper
                        style={style}
                        // used for styling : isDraggingOver={dropSnapshot.isDraggingOver}
                        {...dropProvided.droppableProps}>

                        <div className="drawer__Title">
                            <h3>SUBSCRIPTIONS</h3>
                        </div>
                        <div //DropZone 
                            ref={dropProvided.innerRef}>
                            <div className="drawer__Channels">
                                <InnerQuoteList quotes={quotes} />
                                {dropProvided.placeholder}
                            </div>
                        </div>

                    </div>
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