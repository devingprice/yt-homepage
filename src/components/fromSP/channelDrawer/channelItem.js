import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ChannelPill from './channelPill';

const Container = styled('div')`
    
`;

class ChannelItem extends React.PureComponent {
    render() {
        const { quote, index } = this.props;

        return (

            <Draggable key={quote.id} draggableId={quote.id} index={index}>
                {(
                    dragProvided,//: DraggableProvided,
                    dragSnapshot,//: DraggableStateSnapshot
                ) => (
                        <Container
                            //href={quote.author.url}
                            isDragging={dragSnapshot.isDragging}
                            isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}>
                            {
                                ChannelPill(quote.name, quote.updates, quote.thumbnail, quote.id)
                            }
                        </Container>
                    )}
            </Draggable>

            
        );
    }
}
export default ChannelItem;
/*
class ChannelItem extends React.PureComponent {
    render() {
        const { quote, isDragging, isGroupedOver, provided } = this.props;

        return (
            <Container
                //href={quote.author.url}
                isDragging={isDragging}
                isGroupedOver={isGroupedOver}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                {
                    ChannelPill(quote.name, quote.updates, quote.thumbnail, quote.id)
                }
            </Container>
        );
    }
}
class InnerQuoteList extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.quotes !== this.props.quotes) {
            return true;
        }

        return false;
    }

    render() {
        return this.props.quotes.map((quote, index) => (
            <Draggable key={quote.id} draggableId={quote.id} index={index}>
                {(
                    dragProvided,//: DraggableProvided,
                    dragSnapshot,//: DraggableStateSnapshot
                ) => (
                        <ChannelItem
                            key={quote.id}
                            quote={quote}
                            isDragging={dragSnapshot.isDragging}
                            isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                            provided={dragProvided}
                        />
                    )}
            </Draggable>
        ));
    }
}*/
