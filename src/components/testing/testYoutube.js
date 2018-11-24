import React, { Component } from 'react';

import './testYoutube.scss';
import RightArrow from './rightArrow';
import LeftArrow from './leftArrow';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Search from './testChannelSearch';

import uuid from 'uuid/v4';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const ITEMS = [
    {
        id: uuid(),
        content: 'PewDiePie'
    },
    {
        id: uuid(),
        content: 'Philip DeFranco'
    },
    {
        id: uuid(),
        content: 'videogamedunkey'
    },
    {
        id: uuid(),
        content: 'Imaqtpie'
    },

];
class Tile extends Component {
    render(){
        return (
            <div className="tile">
                <div className="tile_img" style={{ height: "118px", width: "210px", "background-color": "#E0E0E0" }}></div>
                <div className="tile_details">
                    <div className="details_h3" style={{ margin:"12px 0",height: "20px", width: "210px", "background-color": "#E0E0E0"}}></div>
                    <div className="details_stats" style={{ height: "20px", width: "130px", "background-color": "#E0E0E0" }}></div>

                    <p>{this.props.num}</p>
                </div>
            </div>
        )
    }
}

class ListRenderer extends Component {
    // worry about touch screen swipes later,
    // youtube doesnt have swipes, they use a separate mobile site

    // takes list of videos, needs width to display
    // state = scroll
    constructor(props) {
        super(props);
        this.state = {
            "farLeftItemNumber": 0 //used to keep track of where the scroll is at
        };
        let containerWidth = document.getElementsByClassName("shelf").offsetWidth;
        let tileWidth = 214;
        let itemsVisible = containerWidth / tileWidth;
    }
    getNumVisible = () => {
        let shelfWidthString = getComputedStyle(document.getElementsByClassName("shelf")[0]).width
        let shelfWidth = parseInt(shelfWidthString.substring(0,shelfWidthString.length-2))
        return shelfWidth / 214;
    };
    scrollRight = () => {
        let numberVisible = this.getNumVisible();
        let farRightItemNumber = this.state.farLeftItemNumber + numberVisible - 1;

        if((farRightItemNumber + numberVisible) >= this.props.items){
            this.setState({
                "farLeftItemNumber": this.props.items - numberVisible
            })
        } else {
            this.setState({
                "farLeftItemNumber": farRightItemNumber+1
            })
        }
    };
    scrollLeft = () => {
        let numberVisible =  this.getNumVisible();
        if(this.state.farLeftItemNumber >= numberVisible){
            this.setState({
                "farLeftItemNumber": this.state.farLeftItemNumber - numberVisible
            })
        } else {
            this.setState({
                "farLeftItemNumber": 0
            })
        }
    };
    render(){
        let offset = this.state.farLeftItemNumber * 214;
        let isRightArrowVisible = false;
        if (typeof document.getElementsByClassName("shelf")[0] != "undefined" ){
            isRightArrowVisible = this.state.farLeftItemNumber + this.getNumVisible() === this.props.items
        }
        return (
            <div className="listRenderer">
                <div className="leftArrow" style={{"display":
                    this.state.farLeftItemNumber === 0 ? "none" : "flex"
                }}>
                    <a className="leftButton">
                        <div className="iconCont" style={{width:"24px", height:"24px", padding:"auto"}} onClick={this.scrollLeft}>
                            <LeftArrow />
                        </div>
                    </a>
                </div>
                <div className="scrollContainer">
                    <div className="items" style={{transform: "translateX(-" + offset + "px)"}}>
                        <Tile num={1}/>
                        <Tile num={2} />
                        <Tile num={3} />
                        <Tile num={4} />
                        <Tile num={5} />
                        <Tile num={6} />
                        <Tile num={7} />
                    </div>
                </div>
                <div className="rightArrow" style={{
                    "display":
                        isRightArrowVisible ? "none" : "flex"
                }}>
                    <a className="rightButton">
                        <div className="iconCont" style={{ width: "24px", height: "24px", padding: "auto" }} onClick ={this.scrollRight}>
                            <RightArrow/>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
class Shelf extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="shelf" style={{ height: "300px"}}>
                <div className="title" style={{ height: "20px", width: "100px", "margin-top": "24px", "background-color": "#E0E0E0" }}></div>
                <div className="grid">
                    <ListRenderer items={7}/>

                </div>

            </div>
        )
    }
}
/*
 <div className="testYoutube">
 <div className="leftBar">
 placeholder
 <Search/>
 </div>
 <div className="rightBar">
 <Shelf />
 <Shelf />
 <Shelf />
 </div>
 </div>
 */
class testYoutube extends Component {
    render() {
        return (
            <div className="testYoutube">
                <div className="leftBar">
                    placeholder
                    <Search/>
                </div>
                <div className="rightBar">
                    <Shelf />
                    <Shelf />
                    <Shelf />
                </div>
            </div>
        );
    }
}


class Collection extends Component {
    /*constructor(props){
     super(props);
     }
     render(){
     return (
     <div>
     {this.props.children}
     </div>
     )
     }*/
    render() {
        const { provided, innerRef, children } = this.props;
        return (
            <div {...provided.droppableProps} ref={innerRef}>
                {children}
            </div>
        );
    }
}
class Channel extends Component {
    /*render(){
     return (
     <div {...this.props} ref={this.props.innerRef}>
     {this.props.children}
     </div>
     )
     }*/
    render() {
        const { provided, innerRef } = this.props;
        return (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
            >
                {this.props.children}
            </div>
        );
    }
}

class draggableYoutube extends Component {
    state = {
        "first": [],
        "second": []
    };
    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                this.setState({
                    [destination.droppableId]: reorder(
                        this.state[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                this.setState({
                    [destination.droppableId]: copy(
                        ITEMS,
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                this.setState(
                    move(
                        this.state[source.droppableId],
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="leftBar">
                <Droppable droppableId="ITEMS" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <Collection
                            className="kiosk list"
                            provided={provided}
                            innerRef={provided.innerRef}>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Channel
                                                innerRef={provided.innerRef}
                                                //{...provided.draggableProps}
                                                //{...provided.dragHandleProps}
                                                provided={provided}
                                                isDragging={snapshot.isDragging}
                                                className="item">
                                                {item.content}
                                            </Channel>
                                            {snapshot.isDragging && (
                                                <div className="clone item">{item.content}</div>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                        </Collection>
                    )}
                </Droppable>
                </div>
                <div className="rightBar">
                    {Object.keys(this.state).map((list, i) => (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <Collection className="container"
                                           innerRef={provided.innerRef}
                                           provided={provided}
                                           isDraggingOver={snapshot.isDraggingOver}>
                                    {this.state[list].length
                                        ? this.state[list].map(
                                            (item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <Channel
                                                            innerRef={provided.innerRef}
                                                            //{...provided.draggableProps}
                                                            provided={provided}
                                                            isDragging={snapshot.isDragging}
                                                            className="item">
                                                            <div className="handle"
                                                                 {...provided.dragHandleProps}>
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24">
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            {item.content}
                                                        </Channel>
                                                    )}
                                                </Draggable>
                                            )
                                        )
                                        : !provided.placeholder && (
                                            <div className="notice">Drop items here</div>
                                        )}
                                    {provided.placeholder}
                                </Collection>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        )
    }

}

export default testYoutube;
