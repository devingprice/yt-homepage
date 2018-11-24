import React, {Component } from 'react';
import uuid from 'uuid/v4';

import './HomeContent.scss';

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
export const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    console.log(item);
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
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

export class WrapperList extends Component {
    render() {
        const { header, provided, innerRef, children } = this.props;
        return (
            <div className="wrapperList"
                {...provided.droppableProps}
                ref={innerRef}>
                <h3>{header}</h3>
                {children}
            </div>
        );
    }
}
export class WrapperItem extends Component {
    render() {
        const { provided, innerRef } = this.props;
        return (
            <div className="wrapperItem"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
            >
                {this.props.children}
            </div>
        );
    }
}