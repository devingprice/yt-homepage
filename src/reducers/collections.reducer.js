import { boardTypes, collectionTypes } from '../actions/actionTypes';

//for initial state
import { formattedChannels as channels } from '../data';

let localCollections = {}; //JSON.parse(localStorage.getItem('collections'));
const boardInitialState = localCollections ? localCollections : {};
const orderInitialState = localCollections ? Object.keys(localCollections) : {};

export function collections(state = boardInitialState, action) {
    switch (action.type) {
        case boardTypes.NEW_BOARD:
            console.log("new board");
            return action.data ;

        case boardTypes.SET_COLUMN:
            console.log("set columns");
            console.log(action.columns);
            return action.columns ;

        case collectionTypes.COLLECTION_GET_SUCCESS:
            return { 
                ...state, 
                [action.collection.uniqueid]: action.collection
            };

        default:
            return state;
    }
}

export function collectionsBoard(state = boardInitialState, action) {
    switch (action.type) {
        case boardTypes.NEW_BOARD:
            console.log("new board");
            return action.data ;

        case boardTypes.SET_COLUMN:
            console.log("set columns");
            console.log(action.columns);
            return action.columns ;

        case collectionTypes.COLLECTION_GET_SUCCESS:
            return { 
                ...state, 
                [action.collection.uniqueid]: action.collection
            };

        default:
            return state;
    }
}

export function collectionOrder(state = orderInitialState, action) {
    switch (action.type) {
        case boardTypes.NEW_BOARD:
            return Object.keys(action.data) ;

        case boardTypes.SET_ORDERED:
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
