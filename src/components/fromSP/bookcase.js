import React, { Component } from 'react';
import './bookcase.scss';

import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { setColumn, setOrdered } from '../../actions/board.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Shelf from './shelf';

export const Container = styled('div')`
`;
export const ColumnContainer = styled('div')`
`;

const exampleShelfData = {
    "name": "Gaming",
    "channels": [
        {
            id: 12345,
            "name": "Imaqtpie",
            "channelId": "UCjyNFmk6Ionj9Lw9iIo9LtQ"
        },
        {
            id: 12346,
            "name": "videogamedunkey",
            "channelId": "UCsvn_Po0SmunchJYOWpOxMg"
        }
    ]
}
/*
placeholders load before shelf type is known, so dummyShelf 
have a default shelf props that build the placeholder 
default app state of 5 empty shelfs
*/
class Bookcase extends Component {
    render() {
        return (
            <div className="bookcase">
                <Shelf index={123} showChannels={true} numItems={4} doneLoading={true} shelfData={exampleShelfData} />
                <Shelf index={124} showChannels={false} numItems={7} doneLoading={true} />
                <Shelf index={125} showChannels={false} numItems={3} doneLoading={true} />
                <Shelf index={126} showChannels={false} numItems={11} doneLoading={true} />

                <Shelf index={127} showChannels={false} numItems={12} doneLoading={false} />

                
            </div>
        );
    }
}

const exampleShelfs = [
    {
        "index": 123,
        "showChannels": true,
        "numItems": 4,
        "doneLoading": true,
        "shelfData": exampleShelfData
    },
    {
        "index": 124,
        "showChannels": false,
        "numItems": 7,
        "doneLoading": true,
        "shelfData": null
    },
    {
        "index": 125,
        "showChannels": false,
        "numItems": 3,
        "doneLoading": true,
        "shelfData": null
    },
    {
        "index": 126,
        "showChannels": false,
        "numItems": 11,
        "doneLoading": true,
        "shelfData": null
    },
    {
        "index": 127,
        "showChannels": false,
        "numItems": 12,
        "doneLoading": false,
        "shelfData": null
    }
];
class Board extends Component {
    /* eslint-disable react/sort-comp */
    static defaultProps = {
        isCombineEnabled: false
    };

    render() {
        const columns = this.props.reduxColumns;
        const ordered = exampleShelfs;//this.props.ordered;
        const { containerHeight } = this.props;

        return (
            <Droppable
                droppableId="board"
                type="COLUMN"
                //direction="horizontal"
                ignoreContainerClipping={Boolean(containerHeight)}
                isCombineEnabled={this.props.isCombineEnabled}>
                {(provided) => (
                    <Container
                        className="bookcase"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {ordered.map((key, index) => (
                            <Shelf 
                                key={key.index}
                                index={key.index}
                                title={key.index}
                                showChannels={key.showChannels} 
                                numItems={key.numItems} 
                                doneLoading={key.doneLoading} 
                                shelfData={key.shelfData} 
                                isScrollable={this.props.withScrollableColumns}
                                isCombineEnabled={this.props.isCombineEnabled}
                                />
                        ))}

                    </Container>
                )}
            </Droppable>
        );
    }
}
/*
<Column
                                key={key}
                                index={index}
                                title={key}
                                quotes={columns[key].channels}
                                isScrollable={this.props.withScrollableColumns}
                                isCombineEnabled={this.props.isCombineEnabled}
                            />
*/


const mapStateToProps = state => {
    return {
        reduxColumns: state.board.columns,
        ordered: state.boardOrder.ordered,
        //collections: state.collections.collections,
        //channels: state.collections.channels
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setColumn,
        setOrdered
    }, dispatch)
};

export default connect(mapStateToProps,
    mapDispatchToProps)(Board);

//export default Bookcase;
