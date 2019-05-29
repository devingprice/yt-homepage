import React, {Component} from 'react';
import uuid from 'uuid/v4';
import './shelf/shelf.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColumn, setOrdered } from '../actions/board.actions';

import { serverActions } from '../actions/server.actions';

class ShelfAdd extends Component {
    createNewCollection = () => {
        const { columns, ordered, setColumn, setOrdered, create } = this.props;

        let newId = uuid();
        let reColumns = {
            ...columns,
            [newId]: {
                id: newId,
                "name": newId,
                "channels": [],
                "settings": {
                    "showChannels": true,
                    "numItems": 4,
                    "doneLoading": true,
                }
            }
        };
        setColumn(reColumns);

        const reOrdered = Array.from(ordered);
        reOrdered.splice(reOrdered.length, 0, newId);
        setOrdered(reOrdered);

        //const { dispatch } = this.props;
        //dispatch(serverActions.create(newId))
        create(newId);

    };
    render() {
        return (
            <div className="shelf shelfAdd">
                <div className="shelfAdd__button" onClick={()=>{this.createNewCollection()}}>
                    Click here to add a new Collection
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        columns: state.board.columns,
        ordered: state.boardOrder.ordered
    };
};

const mapDispatchToProps = (dispatch) => {
    const create = serverActions.create;
    return bindActionCreators({
        setColumn,
        setOrdered,
        create
    }, dispatch)

};

export default connect(mapStateToProps,
    mapDispatchToProps
)(ShelfAdd);
