// import { serverConstants } from './actionTypes';
import { collectionService, channelService } from '../services';
import { alertActions } from './alert.actions';

import { newBoard } from './board.actions';
import { userActions } from './user.actions';

import uuid from 'uuid/v4';

export const serverActions = {
    // getAllForUser,
    // createCollection,
    // addChannel
};

//server responds with array of collections, but i need a uuid key'd obj
function formatServerResponse(serverRes){
    let returnResponse = {};
    for(let i=0; i < serverRes.collections.length;i++){

        let newChannels = serverRes.collections[i].Channels.map( serverChannel => {
            return {
                id: uuid(),
                "name": serverChannel.name,
                "channelId": serverChannel.ytId,
                "thumbnail": "https://yt3.ggpht.com/a-/AN66SAzwZsCNSyRezNFqEaG6Ef9bFcZ-PzN6CxSzEw=s88-mo-c-c0xffffffff-rj-k-no"
                //server doesnt have thumbnails atm
            }
        });

        returnResponse[uuid()] = {
            id: serverRes.collections[i].id,
            "name": serverRes.collections[i].name,
            "channels": newChannels,
            "settings": {
                "showChannels": false,
                "numItems": 15,
                "doneLoading": true,
            }
        }
    }
    return returnResponse;
}

function getAllForUser() {
    //runs when logging in to app, or to update
    console.log('created action for getAllForUser');

    return dispatch => {
        // dispatch(request({}));
        collectionService.getAllForUser()
            .then(
                collectionRes => {
                    console.log('received all users collections response from server');

                    const receivedColl = formatServerResponse(collectionRes);
                    console.log(receivedColl);

                    //logged in: set state to collections response
                    //dispatch(setColumn(receivedColl));
                    //dispatch(setOrdered(Object.keys(receivedColl)));
                    dispatch(newBoard(receivedColl));

                    // dispatch(success(collectionRes));
                },
                error => {
                    // not logged in: logout(set user state to {}, remove local token)
                    dispatch(userActions.logout());
                    // dispatch(failure(error.toString()));
                }
            );
    };

    //TODO: these do nothing atm
    // function request(empty) { return { type: serverConstants.GETALLFORUSER_SUCCESS, empty } }
    // function success(collectionRes) { return { type: serverConstants.GETALLFORUSER_SUCCESS, collectionRes } }
    // function failure(error) { return { type: serverConstants.GETALLFORUSER_FAILURE, error } }
}

function createCollection(collectionName){
    return dispatch => {
        collectionService.createCollection( collectionName )
            .then(
                response => {
                    //do nothing
                },
                error => {
                    //getallforUser to refresh state
                    getAllForUser();
                    //dispatch(failure(error))  msg
                }
            )
    };

}

/*
Channel is added through other actions in DragDropContext, this is just to let server know
But if server fails, it needs to remove from state
*/
function addChannel(channel, addToCollectionID) {
    return dispatch => {
        channelService.addChannel(channel, addToCollectionID)
            .then(
                response => {
                    //do nothing
                },
                error => {
                    //getallforUser to refresh state
                    getAllForUser();
                    //dispatch(failure(error))  msg
                }
            )
    };

    //function failure(error) { return { type: serverConstants.ADD_CHANNEL_FAILURE, error } }
}