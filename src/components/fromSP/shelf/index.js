import React, { Component } from 'react';
import '../bookcase.scss';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import ChannelsRenderer from './ChannelsRenderer';
import ListRenderer from './ListRenderer';

export const Container = styled('div')`
`;
export const ColumnContainer = styled('div')`
    height: 300px;
    opacity: ${props => props.opacity}
`;
ColumnContainer.defaultProps = {
    opacity: 1
};

class Shelf extends Component {
    render() {//, width: "856px" 
        return (
            <div className="shelf" style={{ height: "300px" }}>
                <div className="title" style={{ height: "20px", width: "100px", "marginTop": "24px", "backgroundColor": "#E0E0E0" }}></div>
                <div className="grid">
                    {
                        this.props.showChannels ?
                            <ChannelsRenderer channels={this.props.shelfData.channels} /> :
                            <ListRenderer items={this.props.numItems} showArrows={this.props.doneLoading} />

                    }

                </div>
            </div>
        )
    }
}
function containsChannel(channelArray, channelKey){
    //if not hovering anything, everything clear
    if (channelKey === null) {
        return true;
    }
    //if hovering a channel, if collection doesnt contain channel make greyed out
    for (let i=0; i < channelArray.length; i++){
        if (channelArray[i].name === channelKey) {
            return true;
        }
    }
    return false;
}
class ShelfWrapper extends Component {
    render() {
        const title = this.props.title;
        //const quotes = this.props.quotes;
        const index = this.props.index;
        const name = this.props.name;

        return (
            <Draggable draggableId={title} index={index} isDragDisabled={!this.props.shelfDrag}>
                {(
                    provided,//: DraggableProvided,
                    snapshot,//: DraggableStateSnapshot
                ) => (
                    <ColumnContainer
                        opacity={containsChannel(this.props.shelfData, this.props.hovering) ? 1 : 0.3}
                        className="shelf"
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <div
                            className="title"
                            //style={{ "max-width": "50px" }}
                        //add back if switch div to style-component
                        //isDragging={snapshot.isDragging}
                        >
                            <div
                                className="Title"
                                //add back if switch div to style-component
                                //isDragging={snapshot.isDragging}
                                {...provided.dragHandleProps}>
                                {name}
                            </div>
                        </div>
                            <div className="grid">
                                {
                                    this.props.showChannels ?
                                        <ChannelsRenderer listId={this.props.title} listType="Quote" channels={this.props.shelfData} /> :
                                        <ListRenderer items={this.props.numItems} showArrows={this.props.doneLoading} />

                                }
                               
                            </div>
                    </ColumnContainer>
                    )}
            </Draggable>
        )
    }
}
/*
 <Container //QuoteList
                                    //className="QuoteList"
                                    listId={title}
                                    listType="Quote"
                                    quotes={quotes}
                                    internalScroll={this.props.isScrollable}
                                    isCombineEnabled={this.props.isCombineEnabled}
                                />

class Column extends Component {
    render() {
        const title = this.props.title;
        const quotes = this.props.quotes;
        const index = this.props.index;
        return (
            <Draggable draggableId={title} index={index}>
                {(
                    provided,//: DraggableProvided,
                    snapshot,//: DraggableStateSnapshot
                ) => (
                        <ColumnContainer
                            ref={provided.innerRef}
                            {...provided.draggableProps}>
                            <div
                                className="Header"
                                style={{ "max-width": "50px" }}
                            //add back if switch div to style-component
                            //isDragging={snapshot.isDragging}
                            >
                                <div
                                    className="Title"
                                    //add back if switch div to style-component
                                    //isDragging={snapshot.isDragging}
                                    {...provided.dragHandleProps}>
                                    {title}
                                </div>
                            </div>
                            <Container //QuoteList
                                //className="QuoteList"
                                listId={title}
                                listType="Quote"
                                quotes={quotes}
                                internalScroll={this.props.isScrollable}
                                isCombineEnabled={this.props.isCombineEnabled}
                            />
                        </ColumnContainer>
                    )}
            </Draggable>
        );
    }
}*/


const mapStateToProps = state => {
    return {
        hovering: state.hover.hovering,
        shelfDrag: state.shelfDrag.shelfDrag
    };
};
export default connect(mapStateToProps,
    null)(ShelfWrapper);

//export default ShelfWrapper;