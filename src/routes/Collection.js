import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeFeedsRequest } from '../actions/feeds.actions';
import Shelf from '../components/shelf';

import DragDropContextWrapper from '../components/DragDropContextWrapper';
import { Droppable } from 'react-beautiful-dnd';
import { filterDistinctChannelIds } from '../helpers/utils';

export default (props) => {
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds);
    const collections = useSelector(state => state.collections)
    
    const collectionId = props.match.params.collectionId;
    const collectionExists = collections[collectionId] ? true : false;
    let collection = collectionExists ? collections[collectionId] : null;
    
    if ( !collectionExists ) {
        //request collection info from server
        const sampleCollection = {
            channels: [
                {
                    channelId: "UCjyNFmk6Ionj9Lw9iIo9LtQ",
                    id: "6eeaf41d-86df-4965-a802-b8d6a7b076f6",
                    name: "Imaqtpie",
                    thumbnail: "https://yt3.ggpht.com/a-/AN66SAzwZsCNSyRezNFqEaG6Ef9bFcZ-PzN6CxSzEw=s88-mo-c-c0xffffffff-rj-k-no"
                },
                {
                    channelId: "UCsvn_Po0SmunchJYOWpOxMg",
                    id: "94c0de20-09c3-41aa-8623-7a2aa386fc52",
                    name: "videogamedunkey",
                    thumbnail: "https://yt3.ggpht.com/a-/AN66SAzwZsCNSyRezNFqEaG6Ef9bFcZ-PzN6CxSzEw=s88-mo-c-c0xffffffff-rj-k-no"
                }
            ],
            id: 123,
            name: "123",
            doneLoading: true,
            numItems: 4,
            showChannels: true,
        }
        collection = sampleCollection;
    }

    const uniqueChannels = filterDistinctChannelIds( { collection } )
    dispatch( makeFeedsRequest(uniqueChannels) );

    console.log(collection);

    return (
        <div className="">
            <h3> Collection 123</h3>

            <DragDropContextWrapper>

                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    //direction="horizontal"
                    ignoreContainerClipping={false}
                    isCombineEnabled={false}>
                    {(provided) => (
                        <div //Container    dont seem to need styled-component or wrapperlist
                            className="bookcase"
                            ref={provided.innerRef}
                            {...provided.droppableProps}>

                            <Shelf
                                key={123}
                                index={123}
                                draggableId={"142536"}
                                collection={collection}
                                feeds={feeds}
                            />

                        </div>
                    )}
                </Droppable>

            </DragDropContextWrapper>

        </div>
    );
};
