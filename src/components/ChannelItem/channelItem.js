import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChannelPill from './channelPill';
import { setHover } from '../../actions/state.actions';



class ChannelItem extends React.PureComponent {
    render() {
        const { quote, index } = this.props;

        return (

            <Draggable key={quote.id} draggableId={quote.id} index={index}>
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
                                this.props.setHover(quote.name)
                            }}
                            onMouseLeave={()=> {this.props.setHover(null)}}
                        >
                            {
                                ChannelPill(quote.name, quote.updates, quote.thumbnail, quote.id)
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

