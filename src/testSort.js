import { SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import React, { Component } from 'react';
import './testSort.css'

//https://github.com/clauderic/react-sortable-hoc

const DragHandle = SortableHandle(() => <div className="stylizedHandle"></div>);

const SortableItem = SortableElement(({ value }) =>
    <div className="stylizedItem">
        <DragHandle/>
        Item {value}
    </div>
);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div className="listWrapper">
            <div className="stylizedList">
            {   
                items.map((value, index) => (
                    <SortableItem key={`item-${index}`} index={index} value={value.Id} />
                ))
            }
            </div>
            
        </div >
    );
});

class SortableComponent extends Component {

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
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle={true}/>;
    }
}

export default SortableComponent;

//test is done, 
// now just need to add toggle for handles 
// + adapt collections to template