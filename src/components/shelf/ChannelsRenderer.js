import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import './shelf.scss';
import ChannelItem from '../ChannelItem/channelItem';

const InnerQuoteList = React.memo((props) => {
    return props.channelList.map((channelData, index) => (
        <ChannelItem key={index} channelData={channelData} index={index}/>
    ));
});

export default React.memo((props) => {
    const {
        listId, 
        listType = 'Quote',
        channelList = [],
        ignoreContainerClipping = false,
        isCombineEnabled = false,
        isDropDisabled = false,
        //style, channelList
    } = props;

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
});
