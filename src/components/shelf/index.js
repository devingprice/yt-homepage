import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd';

import './shelf.scss';
import ChannelsRenderer from './ChannelsRenderer';
import ListRenderer from './ListRenderer';

import { containsChannel, containedChannels, feedsToVideoObjArray } from '../../helpers/utils';

import { collectionActions } from '../../actions/collection.actions';

const ShelfTitle = (props) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.title);

    const changeText = (e) => setText(e.target.value);
    const clickEdit = () => setEditing(!editing);
    const clickSave = () => {
        console.log('rename ' + props.collectionId + ' to ' + text);
        setEditing(false);
    }
    return (
        <div className="shelf__title">
            <p style={ editing ? { display: "none" } : {} }>{text}</p>
            <textarea style={ editing ? {} : { display: "none" } } onChange={changeText} value={text}/>
            {
                !editing ?
                    <button className="edit_icon" onClick={clickEdit}>edit</button> :
                    <button className="save_icon" onClick={clickSave}>save</button>
            }
        </div>
    )
}

export default (props) => {
    const dispatch = useDispatch();
    const stateSettings = useSelector(state => state.visual);
    const feeds = useSelector(state => state.feeds);
    const { draggableId, index, collection }= props;

    const deleteCollection = (collectionId) => {
        console.log('delete ' + collectionId);
        dispatch(collectionActions.delete(collectionId));
    };

    return (
        <Draggable draggableId={draggableId} index={index} isDragDisabled={!stateSettings.draggableShelves}>
            {(provided, snapshot,) => (
                <div className={"shelf " +(containsChannel(collection.channels, stateSettings.hovering) ? "" : "shelf--greyed")}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                    <div className="shelf__header">
                        {/* <div className="Title" >
                            {collection.name}
                        </div> */}
                        <ShelfTitle collectionId={collection.id} title={collection.name}/>
                        <button onClick={()=>deleteCollection(collection.uniqueid)}>x</button>
                    </div>
                    <div className="grid">
                        {
                            stateSettings.showChannelPills ?
                                <ChannelsRenderer listId={draggableId} listType="Quote" channelList={collection.channels ||[]} /> :
                                <ListRenderer videoArray={feedsToVideoObjArray(containedChannels(collection.channels), feeds)} />
                        }

                    </div>
                    {
                        stateSettings.draggableShelves ?
                            <div className="floatHandle" {...provided.dragHandleProps}>^v</div> :
                            null
                    }
                </div>
            )}
        </Draggable>
    )

    
}

/*<Shelf
 key={key}
 index={index}
 title={key}
 name={collections[key].name}
 numItems={collections[key].settings.numItems}
 doneLoading={collections[key].settings.doneLoading}
 channelObjsArray={collections[key].channels}
 isScrollable={withScrollableColumns}
 isCombineEnabled={isCombineEnabled}
 /> */

/*
 const {title, index, name } = this.props;
 const channels= this.props.channelObjsArray;

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
 <ChannelsRenderer listId={this.props.title} listType="Quote" channelList={channels} /> :
 <ListRenderer //items={this.props.numItems} showArrows={this.props.doneLoading}
 videoArray={feedsToVideoObjArray(containedChannels(channels), this.props.feeds)} />

 }

 </div>
 </div>
 )}
 </Draggable>
 )
 */