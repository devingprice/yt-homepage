import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { reorder, reorderQuoteMap, copyObject } from './helpers';
import { setColumn, setOrdered } from '../actions/board.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class DragDropContextWrapper extends Component {
    static defaultProps = {
        isCombineEnabled: false
    };

    onDragEnd = (result) => { //DropResult
        //if combine turned on and item dropped on another
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...this.props.ordered];
                shallow.splice(result.source.index, 1);
                this.props.setOrdered(shallow);
                return;
            }

            const column = this.props.reduxColumns[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columns = {
                ...this.props.reduxColumns,
                [result.source.droppableId]: withQuoteRemoved
            };
            this.props.setColumn(columns);
            return;
        }

        const { source, destination } = result;

        // dropped nowhere
        if (!result.destination) {
            return;
        }

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // copying from panel
        if (source.droppableId === 'PANEL') {
            const columns = copyObject(
                this.props.quotes,
                this.props.reduxColumns,
                source,
                destination
            );
            this.props.setColumn(columns);
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            const ordered = reorder(
                this.props.ordered,
                source.index,
                destination.index
            );

            this.props.setOrdered(ordered);
            return;
        }

        console.log(this.props.reduxColumns);
        console.log(source);
        console.log(destination);
        //moving inside collection
        const data = reorderQuoteMap({
            quoteMap: this.props.reduxColumns,
            source,
            destination
        });

        this.props.setColumn(data.quoteMap);
    };

    render() {
        //const columns = this.props.reduxColumns;
        //const ordered = this.props.ordered;
        const { containerHeight } = this.props;


        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {containerHeight ? (
                    <div className="ParentContainer" height={containerHeight}>
                        {this.props.children}
                    </div>
                ) : (
                        this.props.children
                    )}
            </DragDropContext>
        );
    }
}


const mapStateToProps = state => {
    return {
        reduxColumns: state.board.columns,
        ordered: state.boardOrder.ordered,
        quotes: state.panel.quotes
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setColumn,
        setOrdered
    }, dispatch)
};

export default connect(mapStateToProps,
    mapDispatchToProps)(DragDropContextWrapper);
    