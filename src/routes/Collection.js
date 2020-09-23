import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeFeedsRequest } from '../actions/feeds.actions';
import { collectionActions } from '../actions/collection.actions';

import Shelf from '../components/shelf';
import Controls from '../components/collectionPage/controls';
import CollectionChannels from '../components/collectionPage/channels';
import Grid from '../components/collectionPage/grid';

import DragDropContextWrapper from '../components/DragDropContextWrapper';
import { Droppable } from 'react-beautiful-dnd';
import { filterDistinctChannelIds } from '../helpers/utils';

export default (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.authentication);
    const feeds = useSelector(state => state.feeds);
    
    //#region collection/feeds
    const collectionId = props.match.params.collectionId;
    const collection = useSelector(state => state.collections[collectionId])
    const collectionExists = collection ? true : false;
    
    //should run only once
    useEffect(()=> {
        if ( !collectionExists ) {
            console.log('collection doesnt exist')
            dispatch( collectionActions.get(collectionId) );
        } else {
            console.log('collection exists')
            
        }
    }, []);

    //runs every time collectionExists changes
    useEffect(()=> {
        if (collectionExists) {
            console.log('collection page is requesting feeds');
            const uniqueChannels = filterDistinctChannelIds( { collection } )
            dispatch( makeFeedsRequest(uniqueChannels) );
        }
    }, [collectionExists]);

    //#endregion collection/feeds

    console.log(collection);
    console.log(auth);

    //#region user
    let ownership = false;
    if (auth.loggedIn) {
        if (auth.user && collection && auth.user.id === collection.ownerId){
            ownership = true;
        }
    }
    console.log(`collection owned ${ownership}`)
    //#endregion

    return (
        <div className="">
            <h3> {collection ? collection.name : ""} </h3>

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
                                collection={collection || {}}
                                feeds={feeds}
                            />

                        </div>
                    )}
                </Droppable>

            </DragDropContextWrapper>

            <Controls userId={auth.user.id} owned={ownership} collection={collection}/>
            <DragDropContextWrapper>
                <CollectionChannels channelList={collection ? collection.channels : []} listId="collectionPageChannels" listType="Quote"/>
            </DragDropContextWrapper>
            <Grid channels={collection ? collection.channels : []} />
            
        </div>
    );
};
//
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