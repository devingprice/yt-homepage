import React, { Component } from 'react';
//import '../bookcase.scss';
import './videoTile.scss';

class Tile extends Component {
    placeholder = (title) => {
        return (
            <React.Fragment>
                <div className="tile__img placeholder"></div>
                <div className="details">
                    <div className="details__title--placeholder placeholder"></div>
                    <div className="details__stats--placeholder placeholder" ></div>

                    <p>{title}</p>
                </div>
            </React.Fragment>
        )
    }

    render() {
        const videoObj = this.props.videoObj;
        
        // dont do logic, show placeholder
        if ( videoObj === null){
            const videoTitle = videoObj !== null ? videoObj.title : "";
            const placeholderDiv = this.placeholder(videoTitle);
            return (
                <div className="tile">{placeholderDiv}</div>
            )
        }
        
        const {id,link,title,thumbnail,published,views,channelTitle,channelId} = videoObj;

        return (
            <div className="tile">
                <div className="tile__img">
                    <a className="thumbnail-link" href={link}>
                        <div className="imgShadow">
                        <img src={thumbnail} alt={title}></img>
                        </div>
                    </a>
                </div>
                <div className="details">
                    <h3 className="details__title">
                        <a href={link}>
                            {title}
                        </a>
                    </h3>
                    <div className="details__stats" >
                        <div className="line-container">
                            <a href={channelId}>{channelTitle}</a>
                        </div>
                        <div className="line-container">
                            <span>{views + ' - '}</span>
                            <span>{published}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Tile;