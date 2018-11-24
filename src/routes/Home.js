import React from 'react';
import logo from '../logo.svg';

import { connect } from 'react-redux';
import Search from '../components/channelSearch';
import Bookcase from "../components/testing/Bookcase";
import TestYoutube from '../components/testing/testYoutube';

class Home extends React.Component {
    render(){
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                </header>
                <section style={{"display":"flex","flex-direction":"row"}}>
                    <Search/>
                    <Bookcase/>
                </section>
                <section>
                    <TestYoutube/>
                </section>
            </div>
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
