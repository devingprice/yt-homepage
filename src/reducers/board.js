import {
    formattedChannels as channels,
    collections
} from '../data';

import { boardConstants } from '../actions/actionTypes';



let localCollections = {}; //JSON.parse(localStorage.getItem('collections'));
const boardInitialState = localCollections ? localCollections : {};
const orderInitialState = localCollections ? Object.keys(localCollections) : {};

//console.log(boardInitialState);
//console.log(orderInitialState);

//**********************  Board */

//const columns = collections;
//const ordered = Object.keys(columns);

export function board(state = {
    columns: boardInitialState //columns
                      }
, action) {
    switch (action.type) {
        case boardConstants.SET_COLUMN:
            console.log("set columns");
            console.log(action.columns);
            return { columns: action.columns };

        default:
            return state;
    }
}

//**********************  Ordered */


export function boardOrder(state = {
    ordered: orderInitialState //ordered
                           }
, action) {
    switch (action.type) {
        case boardConstants.SET_ORDERED:
            console.log("set ordered");
            console.log(action.ordered);
            return { ordered: action.ordered };

        default:
            return state;
    }
}

//**********************  panel */

export function panel(state = {
    quotes: channels //sampleItems
}, action) {
    switch (action.type) {
        default:
            return state;
    }
}
