import React, { Component } from 'react';
import './listRenderer.scss';

import {findShelfWidth} from '../../helpers/utils';

import RightArrow from './rightArrow';
import LeftArrow from './leftArrow';
import Tile from '../videoTile';

class SlidingScroll extends Component {
    render() {
        const { videoArray, offset, showLeftArrow, showRightArrow, scrollLeft, scrollRight } = this.props;
        
        return (
            <div className="listRenderer">

                <div className={"leftArrow" + (showLeftArrow ? "" : " hide")} >
                    <div className="arrow-button">
                        <div className="arrow-button__iconCont" onClick={() => {scrollLeft()}}>
                            <LeftArrow />
                        </div>
                    </div>
                </div>

                <div className="scrollContainer">
                    <div className="items" style={{ transform: "translateX(-" + offset + "px)" }}>
                        {
                            videoArray.map((videoObj,index) =>
                                <Tile key={"tile-"+index}  
                                    videoObj={videoObj} />
                            )
                        }
                    </div>
                </div>

                <div className={"rightArrow" + (showRightArrow ? "" : " hide")}>
                    <div className="arrow-button">
                        <div className="arrow-button__iconCont" onClick={() => {scrollRight()}}>
                            <RightArrow />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



//if no video array, no arrows and blank tiles
class SlidingScrollContainer extends Component {
    constructor(props) {
        super(props);

        this.tileWidth = 214;
        //this.numberOfItems = this.props.videoArray.length;
        //if initialzed before videoArray processed it doesnt have any number of items

        this.state = {
            "farLeftItemNumber": 0 //used to keep track of where the scroll is at
        }
    }
    getNumVisible = () => {
        //cant call this in constructor as shelf doesnt exist yet, so I either make it a function or set it as a state
        //let shelfWidthString = getComputedStyle(document.getElementsByClassName("shelf")[0]).width;
        //parseInt(shelfWidthString.substring(0, shelfWidthString.length - 2));
        let shelfWidth = findShelfWidth();
        return shelfWidth / this.tileWidth;
    };
    scrollLeft = () => {
        let numberVisible = this.getNumVisible();
        // if leftItemNum is 6 and numberVisible is 4, scrollLeft sets leftItemNum to 2
        // if leftItemNum is 3 and numberVisible is 4, scrollLeft sets leftItemNum to 0
        if (this.state.farLeftItemNumber >= numberVisible) {
            this.setState({
                "farLeftItemNumber": this.state.farLeftItemNumber - numberVisible
            })
        } else {
            this.setState({
                "farLeftItemNumber": 0
            })
        }
    };
    scrollRight = () => {
        let numberVisible = this.getNumVisible();
        const numberOfItems = this.props.videoArray.length;
        let farRightItemNumber = this.state.farLeftItemNumber + numberVisible - 1; //calcs index of rightmost item

        // if scrollRight would leave blank space by scrolling per numberVisible, dont scroll all the way
        if ((farRightItemNumber + numberVisible) >= numberOfItems) {
            this.setState({
                "farLeftItemNumber": numberOfItems - numberVisible
            })
        } else { // full scroll
            this.setState({
                "farLeftItemNumber": farRightItemNumber + 1
            })
        }
    };

    render() {
        const {videoArray} = this.props;
        const numberOfItems = this.props.videoArray.length;

        //SORT by function later
        const sortedVideoArray = videoArray.sort(function(a,b){
            return b.published - a.published;
        });

        let showLeftArrow = this.state.farLeftItemNumber !== 0;
        let showRightArrow = (this.state.farLeftItemNumber + this.getNumVisible()) < numberOfItems ;
        let offset = this.state.farLeftItemNumber * this.tileWidth;

        return (
            <React.Fragment>
                { // if video array not given, load placeholder
                    videoArray.length > 0 ?
                        <SlidingScroll showLeftArrow={showLeftArrow}
                                       showRightArrow={showRightArrow}
                                       offset={offset}
                                       videoArray={sortedVideoArray}
                                       scrollLeft={this.scrollLeft}
                                       scrollRight={this.scrollRight}
                        /> :
                        <SlidingScroll showLeftArrow={false}
                                       showRightArrow={false}
                                       offset={0}
                            videoArray={Array.apply(null, Array(5)).map((x, i) => { return null})}//i+1
                                       scrollLeft={()=>{}}
                                       scrollRight={()=>{}}
                        />
                }
            </React.Fragment>

        )
    }
}
/*
class ListRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "farLeftItemNumber": 0 //used to keep track of where the scroll is at
        }
    }
    getNumVisible = () => {
        let shelfWidthString = getComputedStyle(document.getElementsByClassName("shelf")[0]).width;
        let shelfWidth = parseInt(shelfWidthString.substring(0, shelfWidthString.length - 2));
        return shelfWidth / 214;
    };
    scrollRight = () => {
        let numberVisible = this.getNumVisible();
        let farRightItemNumber = this.state.farLeftItemNumber + numberVisible - 1;

        if ((farRightItemNumber + numberVisible) >= this.props.items) {
            this.setState({
                "farLeftItemNumber": this.props.items - numberVisible
            })
        } else {
            this.setState({
                "farLeftItemNumber": farRightItemNumber + 1
            })
        }
    };
    scrollLeft = () => {
        let numberVisible = this.getNumVisible();
        if (this.state.farLeftItemNumber >= numberVisible) {
            this.setState({
                "farLeftItemNumber": this.state.farLeftItemNumber - numberVisible
            })
        } else {
            this.setState({
                "farLeftItemNumber": 0
            })
        }
    };
    render() {
        let numberOfItems = 0;
        let videoArray = this.props.videoArray;
        if(videoArray.length > 0){
            numberOfItems = videoArray.length;
        } else {
            numberOfItems = this.props.items;
        }
        let emptyArray = [...Array(this.props.items)];

        let offset = this.state.farLeftItemNumber * 214;
        let isRightArrowVisible = false;
        if (typeof document.getElementsByClassName("shelf")[0] !== "undefined") {
            isRightArrowVisible = this.state.farLeftItemNumber + this.getNumVisible() === this.props.items
        }





        return (
            <div className="listRenderer">
                {
                    this.props.showArrows ?

                        <div className="leftArrow" style={{
                            "display":
                                this.state.farLeftItemNumber === 0 ? "none" : "flex"
                        }}>
                            <div className="arrow-button">
                                <div className="iconCont" style={{ width: "24px", height: "24px", padding: "auto" }} onClick={this.scrollLeft}>
                                    <LeftArrow />
                                </div>
                            </div>
                        </div>

                        : null
                }


                <div className="scrollContainer">
                    <div className="items" style={{ transform: "translateX(-" + offset + "px)" }}>
                        {
                            videoArray.length > 0 ?
                                videoArray.map((videoObj,index) => <Tile key={"tile-"+index} num={videoObj.title} />)
                                :
                                emptyArray.map((emp, index) => <Tile key={"tile-"+index} num={index + 1} />)
                            
                        }


                    </div>
                </div>

                { //TODO: also make right arrow invisible if numVisible > numItems
                    this.props.showArrows ?

                        <div className="rightArrow" style={{
                            "display":
                                isRightArrowVisible ? "none" : "flex"
                        }}>
                            <div className="arrow-button">
                                <div className="iconCont" style={{ width: "24px", height: "24px", padding: "auto" }} onClick={this.scrollRight}>
                                    <RightArrow />
                                </div>
                            </div>
                        </div>

                        : null
                }


            </div>
        )
    }
}
*/

/*
ListRenderer needs videoArray
    if no or empty videoArray given, load placeholder

calculate what is visible and the scroll offset
calculate if arrows need to be visible

display

~~~~ can use visible to perform lazy loading of tiles later using a tile prop SEEN
 */

export default SlidingScrollContainer;//ListRenderer;