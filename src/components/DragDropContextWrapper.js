import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { reorder, reorderQuoteMap, copyObject } from '../helpers/DragDropFunctions';
import { setColumn, setOrdered } from '../actions/board.actions';
import { channelActions } from '../actions/channel.actions';

import { useDispatch, useSelector } from 'react-redux';


export default (props) => {
    const dispatch = useDispatch();
    const collections = useSelector(state => state.collectionsBoard);
    const collectionOrder = useSelector(state => state.collectionOrder);
    const channelList = useSelector(state => state.channelList);

    if (props.isCombineEnabled === null) props.isCombineEnabled = false;

    const onDragEnd = (result) => { //DropResult

        console.log('ran on drag end')
        //if combine turned on and item dropped on another
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...collectionOrder];
                shallow.splice(result.source.index, 1);
                dispatch(setOrdered(shallow));
                return;
            }

            const column = collections[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columns = {
                ...collections,
                [result.source.droppableId]: withQuoteRemoved
            };
            dispatch( setColumn(columns) );
            return;
        }

        const { source, destination } = result;

        // dropped nowhere
        if (!result.destination) {
            return;
        }

        // did not move anywhere
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        console.log(source);
        console.log(destination);

        // copying from channelList
        if (source.droppableId === 'PANEL') {
            console.log(collections)
            console.log('copying: ' + channelList[source.index].name + ' to '+ collections[destination.droppableId].name);
            dispatch(channelActions.add(channelList[source.index], collections[destination.droppableId].uniqueid));
            const columns = copyObject(
                channelList,
                collections,
                source,
                destination
            );
            dispatch(setColumn(columns));
            return;
        }

        // reordering collections
        if (result.type === 'COLUMN') {
            const ordered = reorder(
                collectionOrder,
                source.index,
                destination.index
            );

            dispatch(setOrdered(ordered));
            return;
        }

        // reordering between or within collections
        console.log('copying: ' +  collections[source.droppableId].channels[source.index].name +
                ' from ' + collections[source.droppableId].name +
            ' to '+ collections[destination.droppableId].name);

        const data = reorderQuoteMap({
            quoteMap: collections,
            source,
            destination
        });

        dispatch(setColumn(data.quoteMap));
    };

   
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {props.containerHeight ? (
                <div className="ParentContainer" height={props.containerHeight}>
                    {props.children}
                </div>
            ) : (
                    props.children
                )}
        </DragDropContext>
    );
    
}
