import React, { Component } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Bookcase.css';

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

const grid = 8;

const ITEMS = [
    {
        id: uuid(),
        content: 'Headline'
    },
    {
        id: uuid(),
        content: 'Copy'
    },
    {
        id: uuid(),
        content: 'Image'
    },
    {
        id: uuid(),
        content: 'Slideshow'
    },
    {
        id: uuid(),
        content: 'Quote'
    }
];

class KioskList extends Component {
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
class KioskItem extends Component {
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
class BeautifulDrag extends Component {
    state = {
        "first": [],
        "second": [],
        [uuid()]: []
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

    addList = e => {
        this.setState({ [uuid()]: [] });
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        console.log(this.state);
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="ITEMS" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <KioskList
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
                                            <KioskItem
                                                innerRef={provided.innerRef}
                                                //{...provided.draggableProps}
                                                //{...provided.dragHandleProps}
                                                provided={provided}
                                                isDragging={snapshot.isDragging}
                                                className="item">
                                                {item.content}
                                            </KioskItem>
                                            {snapshot.isDragging && (
                                                <div className="clone item">{item.content}</div>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                        </KioskList>
                        /*<Kiosk
                            innerRef={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                                innerRef={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }>
                                                {item.content}
                                            </Item>
                                            {snapshot.isDragging && (
                                                <Clone>{item.content}</Clone>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                        </Kiosk>*/
                    )}
                </Droppable>
                <div className="content">
                    <div className="button" onClick={this.addList}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                            />
                        </svg>
                        <div className="button__text">Add List</div>
                    </div>
                    {Object.keys(this.state).map((list, i) => (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <KioskList className="container"
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
                                                        <KioskItem
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
                                                        </KioskItem>
                                                    )}
                                                </Draggable>
                                            )
                                        )
                                        : !provided.placeholder && (
                                            <div className="notice">Drop items here</div>
                                        )}
                                    {provided.placeholder}
                                </KioskList>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        );
    }
}


/*
    Takes individual collection as props
    Takes modifers from bookcase
 */
class Shelf extends Component {
    render(){
        return (
            <div>
                <p> {this.props.collection.name}</p>
                {
                    this.props.collection.channels.map(channel =>
                    <p>
                        {channel.name + "    " + channel.channelId}
                    </p>
                    )
                }
            </div>
        )
    }
}

/*
    Takes Collections as props
    Takes global settings such as Movable, make shelf active
 */
class Bookcase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: [
                {
                    "name": "Pew",
                    "channels": [
                        {
                            "name": "PewDiePie",
                            "channelId": "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
                        }
                    ]
                },
                {
                    "name": "Phil",
                    "channels": [
                        {
                            "name": "Philip DeFranco",
                            "channelId": "UClFSU9_bUb4Rc6OYfTt5SPw"
                        }
                    ]
                },
                {
                    "name": "Gaming",
                    "channels": [
                        {
                            "name": "Imaqtpie",
                            "channelId": "UCjyNFmk6Ionj9Lw9iIo9LtQ"
                        },
                        {
                            "name": "videogamedunkey",
                            "channelId": "UCsvn_Po0SmunchJYOWpOxMg"
                        }
                    ]
                }
            ],
            focus: false,
            pill: true
        };
    }

    render(){
        return (
            <div>
                {
                    this.state.collections.map(coll =>
                        <Shelf collection={coll}/>
                    )
                }
            </div>
        )
    }
}

//export default Bookcase;
export default BeautifulDrag;