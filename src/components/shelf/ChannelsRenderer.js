import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import './shelf.scss';
import ChannelItem from '../ChannelItem/channelItem';


class InnerQuoteList extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.channelList !== this.props.channelList) {
            return true;
        }

        return false;
    }

    render() {
        return this.props.channelList.map((channelData, index) => (
            <ChannelItem key={index} channelData={channelData} index={index}/>
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
            isDropDisabled,
            isCombineEnabled,
            listType,
            listId,
            channelList
        } = this.props;

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
                        //isDraggingOver={dropSnapshot.isDraggingOver}
                        //used for styling
                        //isDropDisabled={isDropDisabled}
                        {...dropProvided.droppableProps}>

                        <div //DropZone  dont seem to need styled-component or wrapperlist
                            className="grid-draggable__container"
                            ref={dropProvided.innerRef}>
                            <InnerQuoteList channelList={channelList} />
                            {dropProvided.placeholder}
                        </div>

                    </div>
                )}
            </Droppable>
        );
    }
}


export default ChannelsRenderer;