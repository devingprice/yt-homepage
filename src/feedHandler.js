let Parser = require('rss-parser');

let parser = new Parser({
    customFields: {
        item: [
            ['yt:videoId', 'videoId'],
            ['yt:channelId', 'channelId'],
            'published', 'updated',
            ['media:group','mediaGroup',{keepArray:true}]
        ]
    }
    //rename : [ fromField, toField ]
    //3rd field : {keepArray: true}
});

export default async function fetchFeed(channelId){
    let urlBase = "https://www.youtube.com/feeds/videos.xml?channel_id=";

    let feed = await parser.parseURL( urlBase + channelId );

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
            published: entry.published,
            updated: entry.updated,
            likes: likes,
            dislikes: dislikes,
            views: parseInt(entry['mediaGroup'][0]['media:community'][0]['media:statistics'][0]['$']['views']),
            channelId: entry.channelId,
            channelTitle: entry.author,
        };

        itemsArray.push( newItem );
    });

    return itemsArray;
}

// uncomment and run to get a sample feed
// fetchFeed('UC-lHJZR3Gqxm24_Vd_AJ5Yw');