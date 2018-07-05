import React, { Component } from 'react';
import './Bookcase.css';
import Shelf from './Shelf';
//import Tile from './tile';

class Bookcase extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const shelves = this.props.collections;
        
        return (
            <div className="bookcase">
                {shelves
                    .filter(
                        shelf => !shelf.reservedName
                    )
                    .map((shelf) => (
                        //<ShelfTemp key={shelf.collectionId} shelf={shelf} />
                        <Shelf key={shelf.collectionId} shelf={shelf} rssFeeds={this.props.rssFeeds}/>
                    ))
                }

            </div>
        )

    }

}
export default Bookcase;