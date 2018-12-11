import React from 'react';
import logo from '../logo.svg';

import { connect } from 'react-redux';
import Search from '../components/channelSearch';
import Bookcase from "../components/testing/Bookcase";
import TestYoutube from '../components/testing/testYoutube';
import Layout from '../components/fromSP/layout';

/*
<TestYoutube/>
<section style={{"display":"flex","flex-direction":"row"}}>
                    <Search/>
                    <Bookcase/>
                </section>
*/
class Home extends React.Component {
    render(){
        return (
            <Layout/>
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
