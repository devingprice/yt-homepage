import React, { Component } from 'react';
import './tile.css';

class Tile extends Component {
    /*state = {
        channelTitle: "Philip DeFranco",
        channelId: "UClFSU9_bUb4Rc6OYfTt5SPw",
        channelUrl: "https://www.youtube.com/channel/UClFSU9_bUb4Rc6OYfTt5SPw",
        id: "5dBzB3ssHaU",
        title: "Why Youtube's New Experiment Is Scaring People, Shaun King's False Accusations, & North Korea",
        url: "https://www.youtube.com/v/5dBzB3ssHaU?version=3",
        published: "2018-05-24T21:24:46+00:00",
        thumbnail: "https://i2.ytimg.com/vi/5dBzB3ssHaU/hqdefault.jpg",
        views: "1013426"
    }*/
    constructor(props){
        super(props);
        let temp = props.video;
        temp.id = "5dBzB3ssHaU";
        temp.channelId = "UClFSU9_bUb4Rc6OYfTt5SPw";
        temp.channelUrl = "https://www.youtube.com/channel/UClFSU9_bUb4Rc6OYfTt5SPw";
        this.state= temp;
    }
    render() {
        function timeSinceCalc(date){
            var seconds = Math.floor((new Date() - date) / 1000);
            var interval = Math.floor(seconds / 31536000);
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
        let timeSince = timeSinceCalc(Date.parse(this.state.published))
        function viewsSigFig(views){
            function moveDecimal(rawNum) {
                return Math.abs(Number(rawNum)) >= 1.0e+9
                ? Math.abs(Number(rawNum)) / 1.0e+9 + "B"
                : Math.abs(Number(rawNum)) >= 1.0e+6
                ? Math.abs(Number(rawNum)) / 1.0e+6 + "M"
                : Math.abs(Number(rawNum)) >= 1.0e+3
                ? Math.abs(Number(rawNum)) / 1.0e+3 + "K"
                : Math.abs(Number(rawNum));
            }
            let viewsInt = parseInt(views,10);
            let viewsDec = moveDecimal(viewsInt);
            return parseFloat(viewsDec).toPrecision(2) + viewsDec.replace(/[^B|M|K]/g,"");
        }
        let viewsReduced = viewsSigFig(this.state.views);
        let viewsCommas = (this.state.views).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return (
            <div className="vidTile">
                <div className="vidThumbCont">
                    <img className="vidThumb" alt="" width="210" 
                    src= {this.state.thumbnail}></img>
                </div>
                <div className="vidDetails">
                    <h3 className="vidTitleCont">
                        <a className="vidTitle" aria-label={this.state.title}
                        href={this.state.url} title={this.state.title}>{this.state.title}</a>
                    </h3>
                    <div className="vidMetaCont">
                        <div className="channelCont">
                            <a className="channel" href={this.state.channelUrl}>{this.state.channelTitle}</a>
                        </div>
                        <div className="vidStats">
                            <span className="views">{viewsCommas + " views"} </span>
                            <span className="dot"></span>
                            <span className="timeSince">{timeSince}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tile;