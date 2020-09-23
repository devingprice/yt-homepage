import React from 'react';
import './videoTile.scss';
import { timeSince, viewsSigFigs } from '../../helpers/utils';

export default (props) => {
    const placeholder = (title) => {
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
    };

    const videoObj = props.videoObj;
    
    // dont do logic, show placeholder
    if ( videoObj === null){
        const videoTitle = videoObj !== null ? videoObj.title : "";
        const placeholderDiv = placeholder(videoTitle);
        return (
            <div className="tile">{placeholderDiv}</div>
        )
    }
    
    const {link,title,thumbnail,publishedAt,views,channelTitle,channelId} = videoObj;

    const viewsText = viewsSigFigs(views);
    const date = timeSince(new Date(publishedAt)); 

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
                        <span>{viewsText + ' - '}</span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
