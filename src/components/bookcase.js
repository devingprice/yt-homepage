import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Droppable } from 'react-beautiful-dnd';

import { setColumn, setOrdered } from '../actions/board.actions';

import { makeFeedsRequest } from '../actions/feeds.actions';
import { filterDistinctChannelIds } from '../helpers/utils';

import './bookcase.scss';
import Shelf from './shelf';

import ShelfAdd from './shelfAdd'

class Bookcase extends Component {
    static defaultProps = {
        isCombineEnabled: false
    };

    render() {
        const { columns, ordered,
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
                        {ordered.map((key, index) => (
                            <Shelf 
                                key={key}
                                index={index}
                                title={key}
                                name={columns[key].name}
                                //showChannels={columns[key].settings.showChannels}
                                //showChannels={this.props.showChannelPills}
                                numItems={columns[key].settings.numItems}
                                doneLoading={columns[key].settings.doneLoading}
                                channelObjsArray={columns[key].channels}

                                isScrollable={withScrollableColumns}
                                isCombineEnabled={isCombineEnabled}
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
        columns: state.board.columns,
        ordered: state.boardOrder.ordered,
        //showChannels: state.showChannels.showChannels
        showChannelPills: state.settings.showChannelPills
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
