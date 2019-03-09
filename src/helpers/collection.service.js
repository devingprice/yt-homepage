import config from '../config';
import { authHeader } from './auth.header';

export const collectionService = {
    create,
    getAllForUser
};

function create(collectionName) {
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
            // login successful if there's a jwt token in the response
            console.log(collectionRes);
            return collectionRes;
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

function saveCollections(collectionsToSave){
    localStorage.removeItem('collections');
    localStorage.setItem('collections', JSON.stringify(collectionsToSave));
}