import { SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import React, { Component } from 'react';
import './testSort.css';
//import './Bookcase.css';
import Shelf from './Shelf';

//https://github.com/clauderic/react-sortable-hoc


const SortableItem = SortableElement(({ value, rssFeeds }) =>
    <div className="stylizedItem">
        
        <Shelf key={value.collectionId} shelf={value} rssFeeds={rssFeeds}/>
    </div>
);

const SortableList = SortableContainer(({ items , rssFeeds}) => {
    console.log(items);
    console.log(rssFeeds);
    //className="listWrapper"

    return (
        <div className="bookcase">
            <div className="stylizedList">
            {   
                items.map((value, index) => (
                    <SortableItem key={`item-${index}`} index={index} value={value} rssFeeds={rssFeeds}/>
                ))
            }
            </div>
            
        </div >
    );
});

//gets props collections + rssfeeds
class SortableComponent extends Component {
    constructor(props) {
        super(props);
        //if(props.collections !== undefined){
            this.state = {
                items : props.collections.filter(collection => collection.order)
            }
        /*} else {
            this.state = {
                items: [{}]
            }
        }*/
        ;
        //TODO: Sort after the filter into correct order to start
    }
    /*
    state = {
        items: [
            {Id: 10,
                order: 1},
            {Id: 20,
                order: 2},
            {Id: 30,
                order: 3},
            {Id: 40,
                order: 4},
            {Id: 50,
                order: 5},
            {Id: 60,
                order:6}
        ]
    };
    */
    onSortEnd = ({ oldIndex, newIndex }) => {
        let newOrderArr = arrayMove(this.state.items, oldIndex, newIndex);
        let updatedCollectionsArr = newOrderArr.map((value,index)=> {
            if (value.order != index +1 ){
                value.order = index +1 ;
            }
            return value;
        })
        this.setState({
            items: updatedCollectionsArr
        });
    };
    render() {
        console.log(this.props.rssFeeds);
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle={true}
        rssFeeds={this.props.rssFeeds}/>;
    }
}

export default SortableComponent;

//test is done, 
// now just need to add toggle for handles 
// + adapt collections to template