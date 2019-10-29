import React, {Component} from 'react';
import uuid from 'uuid/v4';
import './shelf/shelf.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColumn, setOrdered } from '../actions/board.actions';

import { serverActions } from '../actions/server.actions';

class ShelfAdd extends Component {
    createNewCollection = () => {
        const { collections, collectionOrder, setColumn, setOrdered, createCollection } = this.props;

        let newId = uuid();
        let newcollections = {
            ...collections,
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

        //TODO: may use function newBoard instead of manually doing this

        setColumn(newcollections);
        const reOrdered = Array.from(collectionOrder);
        reOrdered.splice(reOrdered.length, 0, newId);
        setOrdered(reOrdered);

        createCollection(newId);
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
        collections: state.collections,
        collectionOrder: state.collectionOrder
    };
};

const mapDispatchToProps = (dispatch) => {
    const createCollection = serverActions.createCollection;
    return bindActionCreators({
        setColumn,
        setOrdered,
        createCollection
    }, dispatch)

};

export default connect(mapStateToProps,
    mapDispatchToProps
)(ShelfAdd);
