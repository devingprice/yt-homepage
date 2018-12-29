import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/layout';

class Home extends React.Component {
    render(){
        return (
            <Layout loggedIn={this.props.loggedIn}/>
        )
    }
}


const mapStateToProps = state => {
    const { registering } = state.registration;
    const { loggingIn, loggedIn, user } = state.authentication;

    return {
        loggingIn,
        loggedIn,
        user,
        registering
    };
};

export default connect(mapStateToProps, null)(Home);
