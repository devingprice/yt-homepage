import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeFeedsRequest } from '../actions/feeds.actions';
import { collectionActions } from '../actions/collection.actions';
import Shelf from '../components/shelf';

import DragDropContextWrapper from '../components/DragDropContextWrapper';
import { Droppable } from 'react-beautiful-dnd';
import { filterDistinctChannelIds } from '../helpers/utils';

export default (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.authentication);
    const feeds = useSelector(state => state.feeds);
    // const collections = useSelector(state => state.collections);
    
    //#region collection/feeds
    const collectionId = props.match.params.collectionId;
    // const collectionExists = collections[collectionId] ? true : false;
    // let collection = collectionExists ? collections[collectionId] : null;
    const collection = useSelector(state => state.collections[collectionId])
    const collectionExists = collection ? true : false;
    
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

    if ( !collectionExists ) {
        //request collection info from server
        //collection = sampleCollection;
        
        dispatch( collectionActions.get(collectionId) );
    } else {
        console.log('collection exists')
        const uniqueChannels = filterDistinctChannelIds( { collection } )
        dispatch( makeFeedsRequest(uniqueChannels) );
    }
    // const uniqueChannels = filterDistinctChannelIds( { collection } )
    // const uniqueChannels = ['UCsvn_Po0SmunchJYOWpOxMg']
    // dispatch( makeFeedsRequest(uniqueChannels) );
    
    //#endregion collection/feeds

    console.log(collection);
    console.log(auth);

    //#region user
    let ownership = false;
    if (auth.loggedIn) {
        if (auth.user && auth.user.id === collectionId){
            ownership = true;
        }
    }
    console.log(`collection owned ${ownership}`)
    //#endregion

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
                                collection={collectionExists ? collection: sampleCollection}
                                feeds={feeds}
                            />

                        </div>
                    )}
                </Droppable>

            </DragDropContextWrapper>

        </div>
    );
};

/*
Needs collections[collectionId], userId, feeds
dispatches request for update if necessary on collection
calcs needed channels
makes request for feeds (only updates those needed)

worry about this later:
checks for ownership
    if owned, show shelf
    channels at top and controls different

*/