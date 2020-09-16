import React from 'react';
import './shelf/shelf.scss';
import { useDispatch } from 'react-redux';

import { collectionActions } from '../actions/collection.actions';

export default (props) => {
    const dispatch = useDispatch();
    
    const newCollection = () => {
        dispatch(collectionActions.create("Rename"));
    };

    return (
        <div className="shelf shelfAdd">
            <div className="shelfAdd__button" onClick={newCollection}>
                Click here to add a new Collection
            </div>
        </div>
    )
}
