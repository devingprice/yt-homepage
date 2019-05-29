import { boardConstants } from '../actions/actionTypes';

//for initial state
import { formattedChannels as channels } from '../data';

let localCollections = {}; //JSON.parse(localStorage.getItem('collections'));
const boardInitialState = localCollections ? localCollections : {};
const orderInitialState = localCollections ? Object.keys(localCollections) : {};

export function collections(state = boardInitialState, action) {
    switch (action.type) {
        case boardConstants.SET_COLUMN:
            console.log("set columns");
            console.log(action.columns);
            return action.columns ;

        default:
            return state;
    }
}


export function collectionOrder(state = orderInitialState, action) {
    switch (action.type) {
        case boardConstants.SET_ORDERED:
            console.log("set order");
            return action.ordered;

        default:
            return state;
    }
}

// not actually mutated, this maybe shouldnt be a reducer and should just be imported where needed

export function channelList(state = channels, action) {
    switch (action.type) {
        default:
            return state;
    }
}
