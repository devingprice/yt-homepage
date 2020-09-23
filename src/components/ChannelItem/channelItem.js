import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import ChannelPill from './channelPill';
import ChannelChip from './channelChip';
import './channelItem.scss';
import { setHover } from '../../actions/visual.actions';

export default (props) => {
    const dispatch = useDispatch();
    console.log(props.hoverControls)
    const hoverControls = props.hoverControls !== undefined ? props.hoverControls : true;
    return (
        <Draggable key={props.channelData.id} draggableId={props.channelData.id} index={props.index}>
            {(
                dragProvided,//: DraggableProvided,
                dragSnapshot,//: DraggableStateSnapshot
            ) => (
                    <div //Container
                        //href={quote.author.url}
                        //these 2 used for styling
                        //isDragging={dragSnapshot.isDragging}
                        //isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                        className="channel-pill-draggable"
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        onMouseEnter={()=>{
                            if (hoverControls) dispatch( setHover(props.channelData.name) )
                        }}
                        onMouseLeave={()=> {
                            if (hoverControls) dispatch(setHover(null))
                        }}
                    >
                        {
                            props.useChips ? 
                            <ChannelChip {...props.channelData} /> :
                            ChannelPill(props.channelData.name, props.channelData.updates, props.channelData.thumbnail, props.channelData.id)
                        }
                    </div>
                )}
        </Draggable>
    )
}
