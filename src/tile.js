import React, { Component } from 'react';
import './tile.css';
import {timeSinceCalc, addCommas} from './helper';

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
        this.state= {isMouseInside: false};
    }
    mouseEnter = () => {this.setState({isMouseInside: true});}
    mouseLeave = () => {this.setState({isMouseInside: false});}

    render() {
       let timeSince = timeSinceCalc(Date.parse(this.state.published));
       let viewsCommas = addCommas(this.props.video.views);
        
       let iconStyle = {
        "pointerEvents": "none",
        "display": "block",
        "width": "100%",
        "height": "100%"
       }
        return (
            <div className="vidTile" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <div className="vidThumbCont">
                    <a className="vidThumbLink" aria-hidden="true" rel="null" href={this.props.video.url}>
                        <img className="vidThumb" alt="" width="210" 
                        src= {this.props.video.thumbnail}></img>

                            {this.state.isMouseInside ? 
                                (
                                <div className="mouseover-overlay" >
                                    <div className="overlay">
                                        
                                        <div className="playIcon" icon="play_all">
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  
                                            style={iconStyle}>
                                                <g >
                                                <path d="M8 5v14l11-7z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                ):null
                            } 
                        
                    </a>
                </div>
                <div className="vidDetails">
                    <h3 className="vidTitleCont">
                        <a className="vidTitle" aria-label={this.props.video.title}
                        href={this.props.video.url} title={this.props.video.title}>{this.props.video.title}</a>
                    </h3>
                    <div className="vidMetaCont">
                        <div className="channelCont">
                            <a className="channel" href={this.props.video.channelUrl}>{this.props.video.channelTitle}</a>
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