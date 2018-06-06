import React, { Component } from 'react';
import './Bookcase.css';

import Tile from './tile';

class Bookcase extends Component {
    render() {
        return (
            
            <div className="bookcase">
                <div className="shelf">
                    <h2 className="shelfTitle">
                        The Philip DeFranco Show (Every Mon-Tues-Wed-Thursday!)
                    </h2>
                
                    <div className="grid">
                        <Tile />
                        <Tile />
                        <Tile />
                        <Tile />
                        <Tile />
                        <Tile />
                        <Tile />
                    </div>
                </div>

                <div className="shelf">
                    <h2 className="shelfTitle">
                        The Philip DeFranco Show (Every Mon-Tues-Wed-Thursday!)
                    </h2>
                
                    <div className="grid">
                        <Tile />
                        <Tile />
                        <Tile />
                        <Tile />
                        <Tile />
                        <Tile />
                        <Tile />
                    </div>
                </div>

            </div>
            

        )
    }
}
export default Bookcase;