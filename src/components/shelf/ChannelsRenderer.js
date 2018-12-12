import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import './shelf.scss';
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
            <ChannelItem quote={quote} index={index}/>
        ));
    }
}


class ChannelsRenderer extends Component {
    static defaultProps = {
        listId: 'LIST'
    };
    render() {
        const {
            ignoreContainerClipping,
            //internalScroll,
            //scrollContainerStyle,
            isDropDisabled,
            isCombineEnabled,
            //listId,
            listType,
            style,
            //quotes,
            //title
        } = this.props;

        const listId = this.props.listId;
        const quotes = this.props.channels;

        return (
            <Droppable
                className="channelsRenderer"
                droppableId={listId}
                type={listType}
                direction="horizontal"
                ignoreContainerClipping={ignoreContainerClipping}
                isDropDisabled={isDropDisabled}
                isCombineEnabled={isCombineEnabled}>
                {(
                    dropProvided,//: DroppableProvided,
                    dropSnapshot //: DroppableStateSnapshot
                ) => (
                    <div //Wrapper dont seem to need styled-component or wrapperlist
                        style={style}
                        //isDraggingOver={dropSnapshot.isDraggingOver}
                        //used for styling
                        isDropDisabled={isDropDisabled}
                        {...dropProvided.droppableProps}>

                        <div //DropZone  dont seem to need styled-component or wrapperlist
                            className="grid-draggable__container"
                            ref={dropProvided.innerRef}>
                            <InnerQuoteList quotes={quotes} />
                            {dropProvided.placeholder}
                        </div>

                    </div>
                )}
            </Droppable>
        );
    }
}


export default ChannelsRenderer;