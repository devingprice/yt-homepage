import React from 'react';
import { useSelector } from 'react-redux';

import { Droppable } from 'react-beautiful-dnd';
import { uuidOrderFromCollections } from '../../helpers/utils'

import './bookcase.scss';
import Shelf from '../shelf';
import ShelfAdd from '../shelfAdd'

export default (props) => {
    const collections = useSelector(state => state.collectionsBoard);
    // const collectionOrder = useSelector(state => state.collectionOrder);
    const collectionOrder = uuidOrderFromCollections(collections);
    const loggedIn = useSelector(state => state.authentication.loggedIn);
    // const stateSettings = useSelector(state => state.visual);
    // const feeds = useSelector(state => state.feeds);
    /*
        
    */

    if (props.isCombineEnabled === null) props.isCombineEnabled = false;

    console.log('rendering bookcase')
    console.log(collections)
    console.log(collectionOrder)

    return (
        <Droppable
            droppableId="board"
            type="COLUMN"
            //direction="horizontal"
            ignoreContainerClipping={Boolean(props.containerHeight)}
            isCombineEnabled={props.isCombineEnabled}>
            {(provided) => (
                <div //Container    dont seem to need styled-component or wrapperlist
                    className="bookcase"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {collectionOrder.map((key, index) => (

                        <Shelf
                            key={key}
                            index={index}
                            draggableId={key}
                            collection={collections[key]}
                        />

                    ))}

                    {loggedIn ?
                        <ShelfAdd /> :
                        null
                    }

                </div>
            )}
        </Droppable>
    );

}
