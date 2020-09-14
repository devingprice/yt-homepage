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

// time prop in ISO, return text
export function timeSince(timeRecorded){
    let seconds = Math.floor ( ( new Date() - timeRecorded )/ 1000 );
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

// takes int views, returns text
export function viewsSigFigs(views){
    //fastest solution according to https://stackoverflow.com/questions/6665997/switch-statement-for-greater-than-less-than
    if( views >= 10000000){
        return Math.round(views/1000000) + "M views";
    }
    else if( views >= 1000000){
        return (Math.round(views/1000000 * 10) / 10 ) + "M views";
    }
    else if( views >= 10000){
        return Math.round(views/1000) + "K views";
    }
    else if( views >= 1000){
        return (Math.round(views/1000 * 10) / 10 ) + "K views";
    }
    else {
        return views + " views";
    }
}

export function containsChannel(channelArray, channelKey){
    //if not hovering anything, everything clear
    if (channelKey === null) {
        return true;
    }
    //if hovering a channel, if collection doesnt contain channel make greyed out
    for (let i=0; i < channelArray.length; i++){
        if (channelArray[i].name === channelKey) {
            return true;
        }
    }
    return false; //grey out
}
export function containedChannels(channelObjsArray){
    let channelStringArray = [];
    for(let i =0; i < channelObjsArray.length; i++){
        channelStringArray.push(channelObjsArray[i].channelId)
    }
    return channelStringArray;
}
export function feedsToVideoObjArray(channelStringArray, feeds){
    let arrayOfArrays = [];
    for(let i =0; i < channelStringArray.length; i++){
        if(channelStringArray[i] in feeds){
            arrayOfArrays.push(feeds[channelStringArray[i]])
        }
    }
    return [].concat.apply([],arrayOfArrays);
}

export function objectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function objectEquivalent(a, b, exludeProperties = []) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (!exludeProperties.includes(propName)){
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}