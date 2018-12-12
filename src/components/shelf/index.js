import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import './shelf.scss';
import ChannelsRenderer from './ChannelsRenderer';
import ListRenderer from './ListRenderer';


function containsChannel(channelArray, channelKey){
    //if not hovering anything, everything clear
    if (channelKey === null) {
        return true;
    }
    //if hovering a channel, if collection doesnt contain channel make greyed out
    for (let i=0; i < channelArray.length; i++){
        if (channelArray[i].name === channelKey) {
            return true;
        }
    }
    return false;
}
class Shelf extends Component {
    render() {
        const title = this.props.title;
        //const quotes = this.props.quotes;
        const index = this.props.index;
        const name = this.props.name;

        return (
            <Draggable draggableId={title} index={index} isDragDisabled={!this.props.shelfDrag}>
                {(
                    provided,//: DraggableProvided,
                    snapshot,//: DraggableStateSnapshot
                ) => (
                    <div //ColumnContainer     dont seem to need styled-component or wrapperlist
                        opacity={containsChannel(this.props.shelfData, this.props.hovering) ? 1 : 0.3}
                        className="shelf"
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <div
                            className="title"
                            //style={{ "max-width": "50px" }}
                            //add back if switch div to style-component
                            //isDragging={snapshot.isDragging}
                        >
                            <div
                                className="Title"
                                //add back if switch div to style-component
                                //isDragging={snapshot.isDragging}
                                {...provided.dragHandleProps}>
                                {name}
                            </div>
                        </div>
                            <div className="grid">
                                {
                                    this.props.showChannels ?
                                        <ChannelsRenderer listId={this.props.title} listType="Quote" channels={this.props.shelfData} /> :
                                        <ListRenderer items={this.props.numItems} showArrows={this.props.doneLoading} />

                                }
                               
                            </div>
                    </div>
                    )}
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        hovering: state.hover.hovering,
        shelfDrag: state.shelfDrag.shelfDrag
    };
};
export default connect(mapStateToProps,
    null)(Shelf);
