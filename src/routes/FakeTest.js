import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { collectionService } from '../services';
import { makeFeedsRequest } from '../actions/feeds.actions';
import { filterDistinctChannelIds } from '../helpers/utils';

import Shelf from '../components/shelf';
import DragDropContextWrapper from '../components/DragDropContextWrapper';
import { Droppable } from 'react-beautiful-dnd';

import Toggles from '../components/toggles';

class CollectionPageDisplay extends React.Component {

    render() {
        const { collection } = this.props;

        return (
            <DragDropContextWrapper>

                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    //direction="horizontal"
                    ignoreContainerClipping={false}
                    isCombineEnabled={false}>
                    {(provided) => (
                        <div //Container    dont seem to need styled-component or wrapperlist
                            className="bookcase"
                            ref={provided.innerRef}
                            {...provided.droppableProps}>

                            <Shelf
                                index={10}
                                draggableId={'3f7981b2-6ccf-4702-926f-3059a4e83f4b'}
                                //stateSettings={this.props.stateSettings}
                                collection={collection}
                                //feeds={this.props.feeds}
                            />

                        </div>
                    )}
                </Droppable>

            </DragDropContextWrapper>
        );
    }
}

class CollectionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channels:[]
        };


    }
    componentDidMount(){
        const id = this.props.match.params.id;
        const activeCollection = this.checkForCollectionInCollections(id);
        if(!activeCollection){
            collectionService.requestSingleCollection(id)
                .then( collectionRes => {
                    this.setState(collectionRes);
                    this.requestFeeds(collectionRes);
                },
                error => {
                    console.log("no collection found")
                    // 404 page redirect / display
                })
        }
    }
    componentDidUpdate(prevProps){
        if (this.props.feeds !== prevProps.feeds) {
            console.log('props changed');
        }
    }
    checkForCollectionInCollections = (id) => {
        for ( let collection in this.props.collections){
            if ( this.props.collections[collection].id === id ){
                return this.props.collections[collection];
            }
        }
        return false;
    };
    requestFeeds =( activeCollection ) => {
        const { makeFeedsRequest } = this.props;
        makeFeedsRequest( filterDistinctChannelIds( { activeCollection } ) );
    };
    render() {
        console.log(this.state);
        const collectionId = this.props.match ? this.props.match.params.id : null;

        return(
            <div>
                <div className="headerControls">
                    <Toggles/>
                </div>
                <h3>ID: { collectionId }</h3>
                <h3>{this.state.name}</h3>

                <CollectionPageDisplay
                    collection={this.state}
                    feeds={this.props.feeds}
                    stateSettings={this.props.stateSettings}
                />
            </div>
            )

    }
}

function mapStateToProps(state) {
    return {
        stateSettings: state.settings, //testing
        feeds: state.feeds,
        collections: state.collections
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        makeFeedsRequest
    }, dispatch)
};

const connectedCollectionPage = connect(mapStateToProps,
    mapDispatchToProps
)(CollectionPage);
export default connectedCollectionPage;