import React, { Component } from 'react';

import './HomeContent.scss';
import { reorder, copy, move, WrapperList, WrapperItem } from './helpers';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import uuid from 'uuid/v4';
const collections = [
    {
        "name": "Pew",
        "channels": [
            {
                id: uuid(),
                "name": "PewDiePie",
                "channelId": "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
            }
        ]
    },
    {
        "name": "Phil",
        "channels": [
            {
                id: uuid(),
                "name": "Philip DeFranco",
                "channelId": "UClFSU9_bUb4Rc6OYfTt5SPw"
            }
        ]
    },
    {
        "name": "Gaming",
        "channels": [
            {
                id: uuid(),
                "name": "Imaqtpie",
                "channelId": "UCjyNFmk6Ionj9Lw9iIo9LtQ"
            },
            {
                id: uuid(),
                "name": "videogamedunkey",
                "channelId": "UCsvn_Po0SmunchJYOWpOxMg"
            }
        ]
    }
];

const channels = [
    {
        "publishedAt": "2010-04-29T10:54:00.000Z",
        "channelId": "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
        "title": "PewDiePie",
        "description": "I make videos.",
        "thumbnails": {
            "default": {
                "url": "https://yt3.ggpht.com/-rJq9gk1QIis/AAAAAAAAAAI/AAAAAAAAAAA/Kx4wkvKOfxY/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "medium": {
                "url": "https://yt3.ggpht.com/-rJq9gk1QIis/AAAAAAAAAAI/AAAAAAAAAAA/Kx4wkvKOfxY/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "high": {
                "url": "https://yt3.ggpht.com/-rJq9gk1QIis/AAAAAAAAAAI/AAAAAAAAAAA/Kx4wkvKOfxY/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
        },
        "channelTitle": "PewDiePie",
        "liveBroadcastContent": "upcoming"
    },
    {
        "publishedAt": "2010-10-21T16:44:21.000Z",
        "channelId": "UCsvn_Po0SmunchJYOWpOxMg",
        "title": "videogamedunkey",
        "description": "watch my stupid ass videos.",
        "thumbnails": {
            "default": {
                "url": "https://yt3.ggpht.com/-ftMaOzF43WA/AAAAAAAAAAI/AAAAAAAAAAA/rks3UOR9mGc/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "medium": {
                "url": "https://yt3.ggpht.com/-ftMaOzF43WA/AAAAAAAAAAI/AAAAAAAAAAA/rks3UOR9mGc/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "high": {
                "url": "https://yt3.ggpht.com/-ftMaOzF43WA/AAAAAAAAAAI/AAAAAAAAAAA/rks3UOR9mGc/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
        },
        "channelTitle": "videogamedunkey",
        "liveBroadcastContent": "upcoming"
    },
    {
        "publishedAt": "2006-09-16T02:14:15.000Z",
        "channelId": "UClFSU9_bUb4Rc6OYfTt5SPw",
        "title": "Philip DeFranco",
        "description": "A 5 day a week, daily show where I talk about the news and pop culture that matters to me and should matter to you.",
        "thumbnails": {
            "default": {
                "url": "https://yt3.ggpht.com/-nPmtKfa70lE/AAAAAAAAAAI/AAAAAAAAAAA/E66oeUI2kFw/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "medium": {
                "url": "https://yt3.ggpht.com/-nPmtKfa70lE/AAAAAAAAAAI/AAAAAAAAAAA/E66oeUI2kFw/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "high": {
                "url": "https://yt3.ggpht.com/-nPmtKfa70lE/AAAAAAAAAAI/AAAAAAAAAAA/E66oeUI2kFw/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
        },
        "channelTitle": "Philip DeFranco",
        "liveBroadcastContent": "upcoming"
    },
    {
        "publishedAt": "2007-01-23T22:06:08.000Z",
        "channelId": "UCjyNFmk6Ionj9Lw9iIo9LtQ",
        "title": "Imaqtpie",
        "description": "Welcome to the YouTube channel of Michael \"Imaqtpie\" Santana, former AD Carry for team Dignitas. Watch as a world renowned veteran player like me, show ...",
        "thumbnails": {
            "default": {
                "url": "https://yt3.ggpht.com/-duA-trItRqg/AAAAAAAAAAI/AAAAAAAAAAA/4nHzXfNHUzY/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "medium": {
                "url": "https://yt3.ggpht.com/-duA-trItRqg/AAAAAAAAAAI/AAAAAAAAAAA/4nHzXfNHUzY/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "high": {
                "url": "https://yt3.ggpht.com/-duA-trItRqg/AAAAAAAAAAI/AAAAAAAAAAA/4nHzXfNHUzY/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
        },
        "channelTitle": "Imaqtpie",
        "liveBroadcastContent": "upcoming"
    },
    {
        "publishedAt": "2011-09-10T17:09:59.000Z",
        "channelId": "UCmv1CLT6ZcFdTJMHxaR9XeA",
        "title": "PTXofficial",
        "description": "Three-time Grammy® Award-winning and multi-Platinum-selling Pentatonix has sold nearly 10 million albums worldwide and performed for hundreds of ...",
        "thumbnails": {
            "default": {
                "url": "https://yt3.ggpht.com/-w9XVuaKslpI/AAAAAAAAAAI/AAAAAAAAAAA/nhdbMmmKHGw/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "medium": {
                "url": "https://yt3.ggpht.com/-w9XVuaKslpI/AAAAAAAAAAI/AAAAAAAAAAA/nhdbMmmKHGw/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
            },
            "high": {
                "url": "https://yt3.ggpht.com/-w9XVuaKslpI/AAAAAAAAAAI/AAAAAAAAAAA/nhdbMmmKHGw/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
            }
        },
        "channelTitle": "PTXofficial",
        "liveBroadcastContent": "upcoming"
    }
];

const ITEMS = [
    {
        id: uuid(),
        name: 'PewDiePie',
        "channelId": "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
    },
    {
        id: uuid(),
        name: 'videogamedunkey',
        "channelId": "UCsvn_Po0SmunchJYOWpOxMg"
    },
    {
        id: uuid(),
        name: 'Philip DeFranco',
        "channelId": "UClFSU9_bUb4Rc6OYfTt5SPw"
    },
    {
        id: uuid(),
        name: 'Imaqtpie',
        "channelId": "UCjyNFmk6Ionj9Lw9iIo9LtQ"
    },
    {
        id: uuid(),
        name: 'PTXofficial',
        "channelId": "UCmv1CLT6ZcFdTJMHxaR9XeA"
    }
];

class HomeContent extends Component {
    constructor(props){
        super(props);

        let initState = {};
        for(let i=0;i<collections.length; i++){
            initState[collections[i].name] = collections[i].channels;
        }
        console.log(initState);
        this.state = initState;
    }
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
            <div className="HomeContent">
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="ITEMS" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <div className="bar__left">
                        <WrapperList
                            header="Search"
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
                                            <WrapperItem
                                                innerRef={provided.innerRef}
                                                //{...provided.draggableProps}
                                                //{...provided.dragHandleProps}
                                                provided={provided}
                                                isDragging={snapshot.isDragging}
                                                >
                                                <div className="wrapperItem__text">
                                                    {item.name}
                                                </div>
                                            </WrapperItem>
                                            {snapshot.isDragging && (
                                                <div className="wrapperItem" style={{display:"none!important"}}>{item.name}</div>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                        </WrapperList>
                        </div>
                    )}
                </Droppable>
                <div className="bar__right">
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
                                <WrapperList header={list}
                                        className="container"
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
                                                        <WrapperItem
                                                            innerRef={provided.innerRef}
                                                            //{...provided.draggableProps}
                                                            provided={provided}
                                                            isDragging={snapshot.isDragging}
                                                            className="item">
                                                            <div className="wrapperItem__handle"
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
                                                            <div className="wrapperItem__text">
                                                            {item.name}
                                                            </div>
                                                        </WrapperItem>
                                                    )}
                                                </Draggable>
                                            )
                                        )
                                        : !provided.placeholder && (
                                            <div className="notice">Drop items here</div>
                                        )}
                                    {provided.placeholder}
                                </WrapperList>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
        );
    }
}
export default HomeContent;