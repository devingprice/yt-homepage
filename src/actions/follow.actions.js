import { followTypes } from './actionTypes';
import { collectionService } from '../services';
import { alertActions } from './alert.actions';
import { collectionActions } from './collection.actions';

export const channelActions = {
    add,
    delete: _delete
};


function add(parentId, childId) {
    return dispatch => {
        dispatch(request(parentId, childId));
        collectionService.addFollow(parentId, childId)
            .then(
                response => {
                    dispatch(success(parentId, childId));
                },
                error => {
                    dispatch(alertActions.error(`Problem adding child ${childId} to parent ${parentId}`));
                    dispatch(collectionActions.get(parentId));
                    dispatch(failure(error));
                }
            )
    };

    function request(parentId, childId) { return { type: followTypes.FOLLOW_ADD_REQUEST, parentId, childId } }
    function success(parentId, childId) { return { type: followTypes.FOLLOW_ADD_SUCCESS, parentId, childId } }
    function failure(error) { return { type: followTypes.FOLLOW_ADD_FAILURE, error } }
}

function _delete(parentId, childId) {
    return dispatch => {
        dispatch(request(parentId, childId));
        collectionService.deleteFollow(parentId, childId)
            .then(
                response => {
                    dispatch(success(parentId, childId));
                },
                error => {
                    dispatch(alertActions.error(`Problem deleting child ${childId} from parent ${parentId}`));
                    dispatch(collectionActions.getCollection(parentId));
                    dispatch(failure(error));
                }
            )
    };

    function request(parentId, childId) { return { type: followTypes.FOLLOW_DELETE_REQUEST, parentId, childId } }
    function success(parentId, childId) { return { type: followTypes.FOLLOW_DELETE_SUCCESS, parentId, childId } }
    function failure(error) { return { type: followTypes.FOLLOW_DELETE_FAILURE, error } }
}