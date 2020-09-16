let Parser = require('rss-parser');

export const feedService = {
    fetchFeed,
    fetchAllFeeds
};

let parser = new Parser({
    customFields: {
        item: [
            ['yt:videoId', 'videoId'],
            ['yt:channelId', 'channelId'],
            'published', 'updated',
            ['media:group','mediaGroup',{keepArray:true}]
        ]
    }
});

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export async function fetchFeed(inputChannelId){
    return {}; //too many requests being sent during dev
    let urlBase = "https://www.youtube.com/feeds/videos.xml?channel_id=";

    let feed = await parser.parseURL( CORS_PROXY + urlBase + inputChannelId );

    let itemsArray = [];
    feed.items.forEach(function(entry) {
        let likesDislikes = parseInt(entry['mediaGroup'][0]['media:community'][0]['media:starRating'][0]['$']['count']);
        let percentPositive = (parseFloat(entry['mediaGroup'][0]['media:community'][0]['media:starRating'][0]['$']['average']) / 5).toPrecision(3);

        let likes = parseInt(likesDislikes * percentPositive);
        let dislikes = likesDislikes - likes ;

        let newItem = {
            id: entry.videoId,
            link: entry.link,
            title: entry.title,
            thumbnail: entry['mediaGroup'][0]['media:thumbnail'][0]['$']['url'],
            description: entry['mediaGroup'][0]['media:description'][0],
            published: Date.parse(entry.published),
            updated: Date.parse(entry.updated),
            likes: likes,
            dislikes: dislikes,
            views: parseInt(entry['mediaGroup'][0]['media:community'][0]['media:statistics'][0]['$']['views']),
            channelId: entry.channelId,
            channelTitle: entry.author,
        };

        itemsArray.push( newItem );
    });

    let returnObj = {};
    returnObj[inputChannelId] = itemsArray;
    return returnObj;
}

//TODO the await inside of map may be holding it up, the map should be an array of promises
//return obj of channelId=key arrayOfVideos=item
export async function fetchAllFeeds(arrayOfChannelIds) {
    let pArray = arrayOfChannelIds.map(async channelId => {
        const itemsArray = await fetchFeed(channelId);
        return itemsArray;
    });
    const feeds = await Promise.all(pArray);

    const now = Date.now();

    let flattenedFeeds = {};
    feeds.forEach(feedObj => {
        if(Object.keys(feedObj).length > 0) {
            let key = Object.keys(feedObj)[0];
            flattenedFeeds[key] = feedObj[key];
            flattenedFeeds[key].lastUpdated = now;
        }
        
    });
    
    return flattenedFeeds;
}
