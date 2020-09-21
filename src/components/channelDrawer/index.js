import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import './channelDrawer.scss';
import ChannelItem from '../ChannelItem/channelItem';


const InnerQuoteList = React.memo((props) => {
    return props.channelList.map((channelData, index) => (
        <ChannelItem key={"channelDrawer-"+index} channelData={channelData} index={index}/>
    ));
});

const Panel = (props) => {
    const channelList = useSelector(state => state.channelList);
    const {
        //listId = 'LIST', 
        ignoreContainerClipping = false,
        isCombineEnabled = false,
        //style, channelList
    } = props;

    return (
        <Droppable
            droppableId="PANEL"
            type="Quote"
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={true}
            isCombineEnabled={isCombineEnabled}>
            {(dropProvided, dropSnapshot) => (
                <div //Wrapper
                    style={props.style}
                    // used for styling : isDraggingOver={dropSnapshot.isDraggingOver}
                    {...dropProvided.droppableProps}>

                    <div className="drawer__Title">
                        <h3>SUBSCRIPTIONS</h3>
                    </div>
                    <div //DropZone 
                        ref={dropProvided.innerRef}>
                        <div className="drawer__Channels">
                            <InnerQuoteList channelList={channelList} />
                            {dropProvided.placeholder}
                        </div>
                    </div>

                </div>
            )}
        </Droppable>
    )
}
export default Panel;
