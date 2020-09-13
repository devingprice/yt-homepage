import { channelTypes } from './actionTypes';
import { channelService } from '../services';
import { alertActions } from './alert.actions';
import { collectionActions } from './collection.actions';

export const channelActions = {
    add,
    delete: _delete
};


function add(channel, collectionId) {
    return dispatch => {
        dispatch(request(channel, collectionId));
        channelService.addChannel(channel, collectionId)
            .then(
                response => {
                    dispatch(success(channel, collectionId));
                },
                error => {
                    dispatch(alertActions.error(`Problem adding channel ${channel} to collection ${collectionId}`));
                    dispatch(collectionActions.get(collectionId));
                    dispatch(failure(error));
                }
            )
    };

    function request(channel, collectionId) { return { type: channelTypes.CHANNEL_ADD_REQUEST, channel, collectionId } }
    function success(channel, collectionId) { return { type: channelTypes.CHANNEL_ADD_SUCCESS, channel, collectionId } }
    function failure(error) { return { type: channelTypes.CHANNEL_ADD_FAILURE, error } }
}

function _delete(channel, collectionId) {
    return dispatch => {
        dispatch(request(channel, collectionId));
        channelService.deleteChannel(channel, collectionId)
            .then(
                response => {
                    dispatch(success(channel, collectionId));
                },
                error => {
                    dispatch(alertActions.error(`Problem deleting channel ${channel} from collection ${collectionId}`));
                    dispatch(collectionActions.getCollection(collectionId));
                    dispatch(failure(error));
                }
            )
    };

    function request(channel, collectionId) { return { type: channelTypes.CHANNEL_DELETE_REQUEST, channel, collectionId } }
    function success(channel, collectionId) { return { type: channelTypes.CHANNEL_DELETE_SUCCESS, channel, collectionId } }
    function failure(error) { return { type: channelTypes.CHANNEL_DELETE_FAILURE, error } }
}