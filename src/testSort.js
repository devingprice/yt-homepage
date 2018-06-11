import { SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import React, { Component } from 'react';
import './testSort.css'

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
                    <SortableItem key={`item-${index}`} index={index} value={value} />
                ))
            }
            </div>
            
        </div >
    );
});

class SortableComponent extends Component {

    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        /*items: [
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
        ]*/
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        console.log(this.state.items);
        console.log(oldIndex);
        console.log(newIndex);
        let temp = arrayMove(this.state.items, oldIndex, newIndex);
        console.log(temp);
        this.setState({
            items: temp
        });
        
    };
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle={true}/>;
    }
}

export default SortableComponent;