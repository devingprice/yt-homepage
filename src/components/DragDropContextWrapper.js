import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { reorder, reorderQuoteMap, copyObject } from '../helpers/DragDropFunctions';
import { setColumn, setOrdered } from '../actions/board.actions';
import { channelActions } from '../actions/channel.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class DragDropContextWrapper extends Component {
    static defaultProps = {
        isCombineEnabled: false
    };

    onDragEnd = (result) => { //DropResult

        console.log('ran on drag end')
        //if combine turned on and item dropped on another
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...this.props.collectionOrder];
                shallow.splice(result.source.index, 1);
                this.props.setOrdered(shallow);
                return;
            }

            const column = this.props.collections[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columns = {
                ...this.props.collections,
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
            console.log(this.props.collections)
            console.log('copying: ' + this.props.channelList[source.index].name + ' to '+ this.props.collections[destination.droppableId].name);
            this.props.addChannel(this.props.channelList[source.index], this.props.collections[destination.droppableId].uniqueid);
            const columns = copyObject(
                this.props.channelList,
                this.props.collections,
                source,
                destination
            );
            this.props.setColumn(columns);
            return;
        }

        // reordering collections
        if (result.type === 'COLUMN') {
            const ordered = reorder(
                this.props.collectionOrder,
                source.index,
                destination.index
            );

            this.props.setOrdered(ordered);
            return;
        }

        // reordering between or within collections
        console.log('copying: ' +  this.props.collections[source.droppableId].channels[source.index].name +
                ' from ' + this.props.collections[source.droppableId].name +
            ' to '+ this.props.collections[destination.droppableId].name);

        const data = reorderQuoteMap({
            quoteMap: this.props.collections,
            source,
            destination
        });

        this.props.setColumn(data.quoteMap);
    };

    render() {
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
        collections: state.collectionsBoard,
        collectionOrder: state.collectionOrder,
        channelList: state.channelList
    };
};
const mapDispatchToProps = (dispatch) => {
    const addChannel = channelActions.add;
    return bindActionCreators({
        setColumn,
        setOrdered,
        addChannel
    }, dispatch)
};

export default connect(mapStateToProps,
    mapDispatchToProps)(DragDropContextWrapper);
    