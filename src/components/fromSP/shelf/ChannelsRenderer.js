import React, { Component } from 'react';
import '../bookcase.scss';

import ChannelPill from '../channelDrawer/channelPill';
import ChannelItem from '../channelDrawer/channelItem';


import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Wrapper = styled('div')``;
const DropZone = styled('div')``;
const Container = styled('div')``;

class InnerQuoteList extends React.Component {
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


class QuoteList extends React.Component {
    static defaultProps = {
        listId: 'LIST'
    };
    render() {
        const {
            ignoreContainerClipping,
            internalScroll,
            scrollContainerStyle,
            isDropDisabled,
            isCombineEnabled,
            //listId,
            listType,
            style,
            //quotes,
            title
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
                    <Wrapper
                        style={style}
                        isDraggingOver={dropSnapshot.isDraggingOver}
                        isDropDisabled={isDropDisabled}
                        {...dropProvided.droppableProps}>

                        <DropZone className="grid-draggable__container"
                            ref={dropProvided.innerRef}>
                            <InnerQuoteList quotes={quotes} />
                            {dropProvided.placeholder}
                        </DropZone>

                    </Wrapper>
                )}
            </Droppable>
        );
    }
}



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

export default QuoteList;