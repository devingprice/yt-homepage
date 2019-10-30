import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChannelPill from './channelPill';
import { setHover } from '../../actions/state.actions';



class ChannelItem extends React.PureComponent {
    render() {
        const { channelData, index } = this.props;

        return (

            <Draggable key={channelData.id} draggableId={channelData.id} index={index}>
                {(
                    dragProvided,//: DraggableProvided,
                    dragSnapshot,//: DraggableStateSnapshot
                ) => (
                        <div //Container
                            //href={quote.author.url}
                            //these 2 used for styling
                            //isDragging={dragSnapshot.isDragging}
                            //isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            onMouseEnter={()=>{
                                this.props.setHover(channelData.name)
                            }}
                            onMouseLeave={()=> {this.props.setHover(null)}}
                        >
                            {
                                ChannelPill(channelData.name, channelData.updates, channelData.thumbnail, channelData.id)
                            }
                        </div>
                    )}
            </Draggable>

            
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setHover
    }, dispatch)
};

export default connect(null,
    mapDispatchToProps)(ChannelItem);

