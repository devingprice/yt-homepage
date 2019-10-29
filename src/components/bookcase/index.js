import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Droppable } from 'react-beautiful-dnd';

import { setColumn, setOrdered } from '../../actions/board.actions';

import { makeFeedsRequest } from '../../actions/feeds.actions';
import { filterDistinctChannelIds } from '../../helpers/utils';

import './bookcase.scss';
import Shelf from '../shelf';

import ShelfAdd from '../shelfAdd'

class Bookcase extends Component {
    static defaultProps = {
        isCombineEnabled: false
    };

    render() {
        const { collections, collectionOrder,
            containerHeight, withScrollableColumns, isCombineEnabled
        } = this.props;

        return (
            <Droppable
                droppableId="board"
                type="COLUMN"
                //direction="horizontal"
                ignoreContainerClipping={Boolean(containerHeight)}
                isCombineEnabled={isCombineEnabled}>
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

                        {this.props.loggedIn ?
                            <ShelfAdd /> :
                            null
                        }

                    </div>
                )}
            </Droppable>
        );
    }
}


const mapStateToProps = state => {
    return {
        stateSettings: state.settings, //
        feeds: state.feeds, //
        collections: state.collections,
        collectionOrder: state.collectionOrder
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setColumn,
        setOrdered,
        makeFeedsRequest
    }, dispatch)
};

export default connect(mapStateToProps,
    mapDispatchToProps)(Bookcase);
