import React, { Component } from 'react';
import '../bookcase.scss';

import RightArrow from './rightArrow';
import LeftArrow from './leftArrow';
import Tile from './videoTile';

class ListRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "farLeftItemNumber": 0 //used to keep track of where the scroll is at
        }
        let containerWidth = document.getElementsByClassName("shelf").offsetWidth;
        let tileWidth = 214;
        let itemsVisible = containerWidth / tileWidth;
    }
    getNumVisible = () => {
        let shelfWidthString = getComputedStyle(document.getElementsByClassName("shelf")[0]).width
        let shelfWidth = parseInt(shelfWidthString.substring(0, shelfWidthString.length - 2))
        return shelfWidth / 214;
    }
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
    }
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
    }
    render() {
        let offset = this.state.farLeftItemNumber * 214;
        let isRightArrowVisible = false;
        if (typeof document.getElementsByClassName("shelf")[0] != "undefined") {
            isRightArrowVisible = this.state.farLeftItemNumber + this.getNumVisible() === this.props.items
        }
        let emptyArray = [...Array(this.props.items)];

        return (
            <div className="listRenderer">
                {
                    this.props.showArrows ?

                        <div className="leftArrow" style={{
                            "display":
                                this.state.farLeftItemNumber === 0 ? "none" : "flex"
                        }}>
                            <a className="leftButton">
                                <div className="iconCont" style={{ width: "24px", height: "24px", padding: "auto" }} onClick={this.scrollLeft}>
                                    <LeftArrow />
                                </div>
                            </a>
                        </div>

                        : null
                }


                <div className="scrollContainer">
                    <div className="items" style={{ transform: "translateX(-" + offset + "px)" }}>
                        {
                            emptyArray.map((emp, index) => <Tile num={index + 1} />)
                            
                        }


                    </div>
                </div>

                { //TODO: also make right arrow invisible if numVisible > numItems
                    this.props.showArrows ?

                        <div className="rightArrow" style={{
                            "display":
                                isRightArrowVisible ? "none" : "flex"
                        }}>
                            <a className="rightButton">
                                <div className="iconCont" style={{ width: "24px", height: "24px", padding: "auto" }} onClick={this.scrollRight}>
                                    <RightArrow />
                                </div>
                            </a>
                        </div>

                        : null
                }


            </div>
        )
    }
}

export default ListRenderer;