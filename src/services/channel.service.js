import config from '../config';
import { authHeader } from './auth.header';

export const channelService = {
    addChannel,
    deleteChannel
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok || !data.success ) {
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

    const url = `${config.apiUrl}/channel/` + addToCollectionID;
    return fetch( url , requestOptions)
        .then(handleResponse);
}

function deleteChannel(channelId, collectionUid){
    let authHead = authHeader();
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization
        },
    };

    console.log('deleting channel');

    const url = `${config.apiUrl}/channel/${channelId}/${collectionUid}`;
    return fetch( url , requestOptions)
        .then(handleResponse);
}

function moveChannel(channel, addTo, deleteFrom){
    //return fetch( add URL , requestOptions).then(handleResponse).then(
    //  if response status code = success fetch( delete URL )
    //);
}