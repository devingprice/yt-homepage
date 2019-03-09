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
function containedChannels(channelObjsArray){
    let channelStringArray = [];
    for(let i =0; i < channelObjsArray.length; i++){
        channelStringArray.push(channelObjsArray[i].channelId)
    }
    return channelStringArray;
}
function feedsToVideoObjArray(channelStringArray, feeds){
    let arrayOfArrays = [];
    for(let i =0; i < channelStringArray.length; i++){
        if(channelStringArray[i] in feeds){
            arrayOfArrays.push(feeds[channelStringArray[i]])
        }
    }
    return [].concat.apply([],arrayOfArrays);
}
class Shelf extends Component {
    render() {
        const {title, index, name } = this.props;
        const channels= this.props.channelObjsArray;

        //const title = this.props.title;
        //const quotes = this.props.quotes;
        //const index = this.props.index;
        //const name = this.props.name;
        return (
            <Draggable draggableId={title} index={index} isDragDisabled={!this.props.draggableShelves}>
                {(provided, snapshot,) => (
                    <div //ColumnContainer     dont seem to need styled-component or wrapperlist
                        className={"shelf " +(containsChannel(this.props.channelObjsArray, this.props.hovering) ? "" : "shelf--greyed")}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <div className="title"
                            //isDragging={snapshot.isDragging}
                        >
                            <div className="Title"
                                //isDragging={snapshot.isDragging}
                                {...provided.dragHandleProps}>
                                {name}
                            </div>
                        </div>
                            <div className="grid">
                                {
                                    this.props.showChannelPills ?
                                        <ChannelsRenderer listId={this.props.title} listType="Quote" channels={channels} /> :
                                        <ListRenderer items={this.props.numItems} showArrows={this.props.doneLoading}
                                                      videoArray={feedsToVideoObjArray(containedChannels(channels), this.props.feeds)} />

                                }
                               
                            </div>
                    </div>
                    )}
            </Draggable>
        )
    }
}
/*
Shelf takes { hovering / drag states / feeds }  from redux
    can be called without those besides feeds
Needs Feeds, name + index + key to work
 */

const mapStateToProps = state => {
    return {
        hovering: state.settings.hovering,
        showChannelPills: state.settings.showChannelPills,
        draggableShelves: state.settings.draggableShelves,
        feeds: state.feeds.feeds
    };
};
export default connect(mapStateToProps,
    null)(Shelf);
