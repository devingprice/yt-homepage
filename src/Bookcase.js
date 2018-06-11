import React, { Component } from 'react';
import './Bookcase.css';

import Tile from './tile';

class Bookcase extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const shelves = this.props.collections;
        const rssFeeds = this.props.rssFeeds;
        
        const ShelfTemp = (props) => {
            const videoArray = [];
            props.shelf.channels.forEach(channelItem => {
                if(channelItem.channelId in rssFeeds){
                    rssFeeds[channelItem.channelId].forEach(
                        videoItem => {
                            videoArray.push({
                                id: videoItem["yt:videoId"],
                                channelId: videoItem["yt:channelId"],
                                channelUrl: "https://www.youtube.com/channel/" + videoItem["yt:channelId"],
                                title: videoItem.title,
                                thumbnail: videoItem["media:group"]["media:thumbnail"][0]['$']['url'],
                                channelTitle: videoItem.author,
                                url: videoItem.link,
                                published: videoItem.published,
                                views: videoItem["media:group"]["media:community"][0]["media:statistics"][0]['$']['views'],
                                keyId: channelItem.uId + " " + videoItem.id
                            })
                        }
                    )
                }
            });
            //TODO: sort video array by date or sort function
            if(videoArray.length > 0){
                console.log("shelf ")
                console.log(videoArray)
                console.log("/////// end shelf")
            }
            
            return (
                <div className="shelf" id={props.shelf.collectionId}>
                <h2 className="shelfTitle">
                    {props.shelf.collectionName}
                </h2>
            
                <div className="grid">
                    {videoArray.map((video) =>
                        <Tile key={video.keyId} video={video}/>
                    )}
                </div>
            </div>
            )
        };
        return (
            <div className="bookcase">
                {shelves
                    .filter(
                        shelf => !shelf.reservedName
                    )
                    .map((shelf) => (
                        <ShelfTemp key={shelf.collectionId} shelf={shelf}/>
                    ))
                }
                
            </div>
        )
        
    }
    
}
export default Bookcase;