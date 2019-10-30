import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import './shelf.scss';
import ChannelsRenderer from './ChannelsRenderer';
import ListRenderer from './ListRenderer';

import { containsChannel, containedChannels, feedsToVideoObjArray } from '../../helpers/utils';

class ShelfTitle extends Component {
    //TODO: https://codepen.io/FinalTriumph/pen/gLvWxO
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: props.title
        };
        this.changeText = this.changeText.bind(this);
    }
    changeText(event){
        this.setState({ text: event.target.value })
    };
    clickEdit = () => {
        this.setState({
            editing: true
        })
    };
    clickSave = () => {
        this.changeNameRequest(this.props.collectionId, this.state.text);
        this.setState({
            editing: false
        })
    };
    changeNameRequest = (collectionId, newName) => {
        console.log('rename ' + collectionId + ' to ' + newName)
    };
    render(){
        return (
            <div className="shelf__title">
                <p style={ this.state.editing ? { display: "none" } : {} }>{this.state.text}</p>
                <textarea style={ this.state.editing ? {} : { display: "none" } } onChange={this.changeText} value={this.state.text}/>
                {
                    !this.state.editing ?
                        <button className="edit_icon" onClick={()=>{this.clickEdit()}}>edit</button> :
                        <button className="save_icon" onClick={()=>{this.clickSave()}}>save</button>
                }
            </div>
        )
    }
}

class Shelf extends Component {
    deleteCollection = (collectionId) => {
        console.log('delete ' + collectionId)
    };
    render() {
        const { draggableId, index, stateSettings, collection, feeds }= this.props;
        //{...provided.dragHandleProps}
        return (
            <Draggable draggableId={draggableId} index={index} isDragDisabled={!stateSettings.draggableShelves}>
                {(provided, snapshot,) => (
                    <div className={"shelf " +(containsChannel(collection.channels, stateSettings.hovering) ? "" : "shelf--greyed")}
                         ref={provided.innerRef}
                         {...provided.draggableProps}>
                        <div className="shelf__header">
                            <div className="Title" >
                                {collection.name}
                            </div>
                            <ShelfTitle collectionId={collection.id} title={collection.name}/>
                            <button onClick={()=>this.deleteCollection(collection.id)}>x</button>
                        </div>
                        <div className="grid">
                            {
                                stateSettings.showChannelPills ?
                                    <ChannelsRenderer listId={draggableId} listType="Quote" channelList={collection.channels} /> :
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
}


const mapStateToProps = state => {
    return {
        stateSettings: state.settings,
        feeds: state.feeds
    };
};
/*
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //delete Collection
        //rename Collection
    }, dispatch)
};
*/
export default connect(mapStateToProps,
    null)(Shelf);

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