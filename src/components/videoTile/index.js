import React, { Component } from 'react';
//import '../bookcase.scss';
import './videoTile.scss';

class Tile extends Component {
    render() {
        return (
            <div className="tile">
                <div className="tile__img"></div>
                <div className="details">
                    <div className="details__title"></div>
                    <div className="details__stats" ></div>

                    <p>{this.props.num}</p>
                </div>
            </div>
        )
    }
}
export default Tile;