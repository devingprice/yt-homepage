import config from '../config';
// import { collections } from '../data';
import { authHeader } from './auth.header';

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
                console.log('got a 401');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const createCollection = (name) => {
    let authHead = authHeader();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization

        },
        body: JSON.stringify({"name": name })
    };

    return fetch(`${config.apiUrl}/collection`, requestOptions)
        .then(handleResponse);
}

const getAllForUser = () => {
    //userId until i make server do it with tokens
    const authHead = authHeader();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization
        }
    };

    const url = `${config.apiUrl}/collections/${userId}`;
    return fetch( url , requestOptions)
        .then(handleResponse);
}

const getCollection = (collectionUid) => {
    return request('GET', `/collection/${collectionUid}`)
        .then(response => {
            console.log(response);
            let returnObj = response.collection;
            returnObj.channels = returnObj.channels.map(item => {
                return {
                    ytId: item.ytId,
                    name: item.name,
                    channelId: item.ytId
                }
            })
            return returnObj;
        });
}

const getCollectionOld = (collectionUid) => {
    //TODO: need to test || should work even if not logged in
    const authHead = authHeader();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization,
        }
    };

    const url = `${config.apiUrl}/collection/${collectionUid}`;
    return fetch( url , requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response);
            let returnObj = response.collection;
            returnObj.channels = returnObj.channels.map(item => {
                return {
                    ytId: item.ytId,
                    name: item.name,
                    channelId: item.ytId
                }
            })
            return returnObj;
        });
}

const updateCollection = (collectionUid, data) => {
    return request('PUT', `/collection/${collectionUid}`, data)
        .then(response => {
            console.log(response);
            let returnObj = response.collection;
            returnObj.channels = returnObj.channels.map(item => {
                return {
                    ytId: item.ytId,
                    name: item.name,
                    channelId: item.ytId
                }
            })
            return returnObj;
        });
}

const deleteCollection = (collectionUid) => {
    return request('DELETE', `/collection/${collectionUid}`);
}

const updateOrder = (userId, arrayofCollectionUidsAndOrderInt) => {
    return request('PUT', `/order/${userId}`, arrayofCollectionUidsAndOrderInt);
}

const addFollow = (parentCollectionUid, childCollectionUid) => {
    return request('POST', `/follow/${parentCollectionUid}/${childCollectionUid}`);
}

const deleteFollow = (parentCollectionUid, childCollectionUid) => {
    return request('DELETE', `/follow/${parentCollectionUid}/${childCollectionUid}`);
}

//todo: testing generic
function request(method, url, body) {
    const authHead = authHeader();

    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization,
        }
    };
    if(body) 
        requestOptions.headers.body = JSON.stringify(body)

    return fetch(`${config.apiUrl}${url}`, requestOptions)
        .then(handleResponse)
}

export const collectionService = {
    createCollection,
    getAllForUser,
    getCollection,
    updateCollection,
    deleteCollection,
    updateOrder,
    addFollow,
    deleteFollow,
};

//#region TODO: not currently in use, not sure that it will be since this isnt currently a bottleneck
function saveCollections(collectionsToSave){
    localStorage.removeItem('collections');
    localStorage.setItem('collections', JSON.stringify(collectionsToSave));
}
//#endregion