import React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import Layout from '../components/layout';
import { makeFeedsRequest } from '../actions/feeds.actions';
import { filterDistinctChannelIds } from '../helpers/utils';

import { serverActions } from '../actions/server.actions';

class Home extends React.Component {
    // I don't know where to put the "startup" actions so I'm going to do it on the routes

    componentDidMount(){
        const { makeFeedsRequest, collections, getAllForUser } = this.props;
        getAllForUser();
        makeFeedsRequest( filterDistinctChannelIds(collections) );
    }
    componentDidUpdate(prevProps){
        const { makeFeedsRequest, collections, getAllForUser } = this.props;
        const prevFeeds = filterDistinctChannelIds(prevProps.collections);
        const currFeeds = filterDistinctChannelIds(collections);
        // prevFeeds !== currFeeds is always evaluating to true, since this happens every update i'm just going to check for add / remove
        if(prevFeeds.length !== currFeeds.length){
            console.log("updated");
            makeFeedsRequest( currFeeds );
        }
    }


    render(){
        return (
            <Layout loggedIn={this.props.loggedIn}/>
        )
    }
}

// may add wrapper component in between home and layout in order to use logged in status to fetch collections + feeds
// i think feed requests may be sent by collections that needs them

const mapStateToProps = state => {
    const { loggingIn, loggedIn, user } = state.authentication;

    console.log(state)
    return {
        loggingIn,
        loggedIn,
        user,
        collections: state.board.columns,
    };
};
const mapDispatchToProps = (dispatch) => {
    const getAllForUser = serverActions.getAllForUser;
    return bindActionCreators({
        makeFeedsRequest,
        getAllForUser
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
