import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeFeedsRequest } from '../actions/feeds.actions';
import Shelf from '../components/shelf';

import DragDropContextWrapper from '../components/DragDropContextWrapper';
import { Droppable } from 'react-beautiful-dnd';
import { filterDistinctChannelIds } from '../helpers/utils';


class CollectionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { collection, feeds } = this.props;
        console.log(collection);
        console.log(feeds);
        return (
            <div className="">
                <h3> Collection 123</h3>

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
                                    key={123}
                                    index={123}
                                    title={123}
                                    name={collection.name}
                                    //showChannels={columns[key].settings.showChannels}
                                    showChannels={false}
                                    numItems={collection.settings.numItems}
                                    doneLoading={collection.settings.doneLoading}
                                    channelObjsArray={collection.channels}

                                    isScrollable={false}
                                    isCombineEnabled={false}
                                />

                            </div>
                        )}
                    </Droppable>

                </DragDropContextWrapper>

            </div>
        );
    }
}

class CollectionPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        //if collection is not in collections, fetch it
        //if feeds are not in feeds, fetch them

        const id = 123;
        //if collection is already in collections, use it
        this.activeCollection = false;
        for ( let collection in this.props.collections){
            if ( this.props.collections[collection].id === id ){
                this.activeCollection = this.props.collections[collection];
            }
        }
        if(!this.activeCollection){
            //request collection info from server
            const sampleCollection = {
                channels: [
                    {
                        channelId: "UCjyNFmk6Ionj9Lw9iIo9LtQ",
                        id: "6eeaf41d-86df-4965-a802-b8d6a7b076f6",
                        name: "Imaqtpie",
                        thumbnail: "https://yt3.ggpht.com/a-/AN66SAzwZsCNSyRezNFqEaG6Ef9bFcZ-PzN6CxSzEw=s88-mo-c-c0xffffffff-rj-k-no"
                    },
                    {
                        channelId: "UCsvn_Po0SmunchJYOWpOxMg",
                        id: "94c0de20-09c3-41aa-8623-7a2aa386fc52",
                        name: "videogamedunkey",
                        thumbnail: "https://yt3.ggpht.com/a-/AN66SAzwZsCNSyRezNFqEaG6Ef9bFcZ-PzN6CxSzEw=s88-mo-c-c0xffffffff-rj-k-no"
                    }
                ],
                id: 123,
                name: "123",
                settings:
                    {
                        doneLoading: true,
                        numItems: 4,
                        showChannels: true
                    }
            }
            this.activeCollection = sampleCollection;
            this.requestFeeds(this.activeCollection);
        }
        //activeCollection.channels.forEach(function(channel){
        // if(!(channel.channelId in feedObj)){
        // parse through active collection channels and request these feeds
        //});
    }

    requestFeeds =( activeCollection ) => {
        const { makeFeedsRequest } = this.props;
        makeFeedsRequest( filterDistinctChannelIds( { activeCollection } ) );
    };
    render() {




        return (
            <div className="">
                <h3> Collection 123</h3>

                <CollectionPage
                    collection={this.activeCollection}
                    feeds={this.props.feeds}
                />

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
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
    mapDispatchToProps)(CollectionPageWrapper);
export default connectedCollectionPage;