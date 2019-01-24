export function findShelfWidth() {
    const windowWidth = window.innerWidth;
    let shelfWidth = 0;
    switch(true){
        case (windowWidth < 700):
            shelfWidth = 214;
            break;
        case (windowWidth >= 700 && windowWidth < 910):
            shelfWidth = 428;
            break;
        case (windowWidth >= 910 && windowWidth < 1120):
            shelfWidth = 642;
            break;
        case (windowWidth >= 1120 && windowWidth < 1365):
            shelfWidth = 856;
            break;
        case (windowWidth >= 1365):
            shelfWidth = 1070;
            break;
        default:
            shelfWidth = -1;
    }
    return shelfWidth;
}

//takes collections obj and returns an array of unique channelIds
export function filterDistinctChannelIds(collectionsObj){
    console.log(collectionsObj);
    let channelIds = [];
    for (const collection in collectionsObj){
        collectionsObj[collection].channels.forEach(function(channelObj){
            channelIds.push(channelObj.channelId)
        })
    }
    let distinctChannelIds = [...new Set(channelIds)];
    return distinctChannelIds;
}