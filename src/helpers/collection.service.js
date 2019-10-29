import config from '../config';
import { authHeader } from './auth.header';

export const collectionService = {
    createCollection,
    getAllForUser,
    requestSingleCollection,
    addChannel
};


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function getAllForUser() {
    const authHead = authHeader();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.user.id;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization

        }
    };

    const url = `${config.apiUrl}/v1/collections/`+ userId;
    return fetch( url , requestOptions)
        .then(handleResponse)
        .then(collectionRes => {
            // login successful if there's a jwt token in the response
            console.log(collectionRes);
            return collectionRes;
        });
}

function requestSingleCollection(collectionId){
    //TODO: need to test || should work even if not logged in
    const authHead = authHeader();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization

        }
    };

    const url = `${config.apiUrl}/v1/collection/`+ collectionId;
    return fetch( url , requestOptions)
        .then(handleResponse)
        .then(collectionRes => {
            let collectionObj = collectionRes.company;
            collectionObj.channels = collectionObj.channels.map(serverChannel => {
                return {
                    id: serverChannel.id,
                    name: serverChannel.name,
                    channelId: serverChannel.ytId
                }
            });
            return collectionObj;
        });
}
/* OLD COMMENT, made action in server.action
if I would like to dispatch a collection failed action to remove the locally made collection from the state :
 I could return the action: { type: serverConstants.CREATE_COLLECTION_FAILURE, collectionIdSubmitted }
 and bind the function as an action creator, then in my reducer have a newBoard made with this id spliced out
 */
function createCollection(collectionName) {
    let authHead = authHeader();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization

        },
        body: JSON.stringify({"name":collectionName})
    };

    return fetch(`${config.apiUrl}/v1/collection`, requestOptions)
        .then(handleResponse)
        .then(collectionRes => {
            if(!collectionRes.success){
                console.log("Failed Create Collection")
            }
            return collectionRes;
        },
        error => {
            console.log("Failed Create Collection")
        });
}







function addChannel(channel, addToCollectionID){
    let authHead = authHeader();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization

        },
        body: JSON.stringify({
            "name": channel.name,
            "ytId": channel.channelId, //TODO: will update to channelID later
            "thumbnail": '' //TODO: will add serverside later
        })
    };

    console.log('adding channel');

    const url = `${config.apiUrl}/v1/channel/` + addToCollectionID;
    return fetch( url , requestOptions)
        .then(handleResponse)
        .then(collectionRes => {
            return collectionRes;
        });
}


//TODO: ///////////////////////////////////////////////////////////////
function moveChannel(channel, addTo, deleteFrom){}
function deleteChannel( channel, deleteFrom ){
    let authHead = authHeader();
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization

        },
        body: JSON.stringify({})
    };

    const url = `${config.apiUrl}/v1/channel/`;
    return fetch( url , requestOptions)
        .then(handleResponse)
        .then(collectionRes => {
            return collectionRes;
        });
}

function renameCollection(collectionId, newName){}
function deleteCollection(collectionId){}
function changeCollectionSettings(collectionId, newSettings){}


//TODO: not currently in use, not sure that it will be since this isnt currently a bottleneck
function saveCollections(collectionsToSave){
    localStorage.removeItem('collections');
    localStorage.setItem('collections', JSON.stringify(collectionsToSave));
}