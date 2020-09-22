import { object } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { containedChannels, feedsToVideoObjArray } from '../../../helpers/utils';

export default (props) => {
    if (!props.channels) return (<React.Fragment/>)

    console.log(props);
    const channelIds = props.channels.map(item=> item.ytId);
    const feeds = useSelector(state => {
        return Object.keys(state.feeds)
            .filter(key => channelIds.includes(key))
            .reduce((obj, key) => {
                obj[key] = state.feeds[key]
                return obj;
            }, {});
    });
    console.log(feeds);
    const videoArray = feedsToVideoObjArray(channelIds, feeds);
    console.log(videoArray);

    return (
        <React.Fragment />
    )
}