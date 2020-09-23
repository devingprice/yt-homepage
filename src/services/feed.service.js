import config from '../config';
// import { collections } from '../data';
import { authHeader } from './auth.header';
// let Parser = require('rss-parser');

export const feedService = {
    fetchFeed,
    fetchAllFeeds
};

// let parser = new Parser({
//     customFields: {
//         item: [
//             ['yt:videoId', 'videoId'],
//             ['yt:channelId', 'channelId'],
//             'published', 'updated',
//             ['media:group','mediaGroup',{keepArray:true}]
//         ]
//     }
// });

// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

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

export async function fetchFeed(channelId) {
    const authHead = authHeader();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHead.Authorization
        }
    };

    const url = `${config.apiUrl}/videos/${channelId}`;
    return fetch( url , requestOptions)
        .then(handleResponse);
}

//TODO the await inside of map may be holding it up, the map should be an array of promises
//return obj of channelId=key arrayOfVideos=item

export async function fetchAllFeeds(arrayOfChannelIds) {
    let pArray = arrayOfChannelIds.map(async channelId => {
        const itemsArray = await fetchFeed(channelId);
        return itemsArray;
    });
    const feeds = await Promise.all(pArray);
    console.log(feeds)
    const now = Date.now();

    let flattenedFeeds = {};
    feeds.forEach(feedResponse => {
        if(feedResponse.success) {
            let ytId = feedResponse.channelId;
            flattenedFeeds[ytId] = {
                videos: feedResponse.videos,
                lastUpdatedOnDB: feedResponse.lastUpdatedOnDB,
                lastPulledToLocal: now,
            };
            //flattenedFeeds[ytId].lastPulledToLocal = now;
            //TODO: feeds is currently an array only, i should have last updated here as well
            // I am also losing the lastUpdatedOnDB value with current method
        }
    });
    
    return flattenedFeeds;
}
