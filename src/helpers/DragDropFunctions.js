import uuid from 'uuid/v4';

// takes array # # , returns array
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

//takes { "id":{ channels:[{}] } } dndSource dndDest , returns object.quoteMap{inputFormat}
export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
    const current = [...quoteMap[source.droppableId].channels];
    const next = [...quoteMap[destination.droppableId].channels];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);
        const result = {
            ...quoteMap,
            [source.droppableId]: {
                "name": quoteMap[source.droppableId].name,
                "channels": reordered,
                "settings": quoteMap[source.droppableId].settings
            }
        };
        return {
            quoteMap: result
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const result = {
        ...quoteMap,
        [source.droppableId]: {
            "name": quoteMap[source.droppableId].name,
            "channels": current,
            "settings": quoteMap[source.droppableId].settings
        },
        [destination.droppableId]: {
            "name": quoteMap[destination.droppableId].name,
            "channels": next,
            "settings": quoteMap[destination.droppableId].settings
        }
    };

    return {
        quoteMap: result
    };
};

//Moves an item from one list to another list.
export const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    console.log(droppableDestination);
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

export const copyObject = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = JSON.parse(JSON.stringify(destination)); //hacky cloning
    const item = sourceClone[droppableSource.index];

    destClone[droppableDestination.droppableId].channels.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
