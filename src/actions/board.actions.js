import { boardTypes } from './actionTypes';
// import uuid from 'uuid/v4';

export const setColumn = (input) => ({ type: boardTypes.SET_COLUMN, columns: input });
export const setOrdered = (input) => ({ type: boardTypes.SET_ORDERED, ordered: input });
export const newBoard = (input) => ({ type: boardTypes.NEW_BOARD, data: input });
    //has to be own action because if dragdrop tries to update when ordered != column keys then it crashes

// export const newColumn = () => ({type: boardTypes.NEW_COLUMN})
// export const create = () =>{
//     const name = uuid();
//     return dispatch => {
//         dispatch(request());
//         collectionService.createCollection( collectionName )
//             .then(
//                 response => {
//                     console.log(response);
//                     dispatch(success(response));
//                 },
//                 error => {
//                     //getallforUser to refresh state TODO
//                     dispatch(failure(error))
//                 }
//             )
//     };

//     function request() { return { type: collectionTypes.COLLECTION_CREATE_REQUEST } }
//     function success(collectionId) { return { type: collectionTypes.COLLECTION_CREATE_SUCCESS, collectionId } }
//     function failure(error) { return { type: collectionTypes.COLLECTION_CREATE_FAILURE, error } }
// }