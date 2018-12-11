import React, { Component } from 'react';
import '../bookcase.scss';

class Tile extends Component {
    render() {
        return (
            <div className="tile">
                <div className="tile_img" style={{ height: "118px", width: "210px", "background-color": "#E0E0E0" }}></div>
                <div className="tile_details">
                    <div className="details_h3" style={{ margin: "12px 0", height: "20px", width: "210px", "background-color": "#E0E0E0" }}></div>
                    <div className="details_stats" style={{ height: "20px", width: "130px", "background-color": "#E0E0E0" }}></div>

                    <p>{this.props.num}</p>
                </div>
            </div>
        )
    }
}
export default Tile;