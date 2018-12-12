import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ChannelPill from './channelPill';


import { setHover } from '../../../actions/state.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Container = styled('div')`
    width: 240px;
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
                            {...dragProvided.dragHandleProps}
                            onMouseEnter={()=>{
                                this.props.setHover(quote.name)
                            }}
                            onMouseLeave={()=> {this.props.setHover(null)}}
                        >
                            {
                                ChannelPill(quote.name, quote.updates, quote.thumbnail, quote.id)
                            }
                        </Container>
                    )}
            </Draggable>

            
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setHover
    }, dispatch)
};

export default connect(null,
    mapDispatchToProps)(ChannelItem);

//export default ChannelItem;

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
