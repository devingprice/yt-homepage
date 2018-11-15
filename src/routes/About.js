import React from 'react';
import {connect} from 'react-redux';

import { bindActionCreators } from 'redux';

/*
const About = ({ isPinging, ping }) => (
    <div>
        <h1>is pinging: {isPinging.toString()}</h1>
        <button onClick={()=>ping}>Start PING</button>
        <button onClick={()=>console.log('log')}>Start LOG</button>
    </div>
);*/
class About extends React.Component {
    clickPing = () => {
        console.log('click ping');
        this.props.ping();
    }
    login = () => {
        console.log('login');
        this.props.login();
    }
    logout = () => {
        console.log('logout');
        this.props.logout();
    }
    render(){
        return (
            <div>
                <h1>is pinging: {this.props.isPinging.toString()}</h1>
                <button onClick={() => this.clickPing()}>Start PING</button>
                <button onClick={() => console.log('log')}>Start LOG</button>
                <h1>is logged in: {this.props.loggedIn.toString()}</h1>
                <h1>loading: {this.props.loading.toString()}</h1>
                {
                    this.props.loggedIn ?
                        <button onClick={() => this.logout()}>Log out</button> :
                        <button onClick={() => this.login()}>log in</button>
                }
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        isPinging: state.pingReducer.isPinging,
        loading: state.authDummy.loading,
        loggedIn: state.authDummy.loggedIn
    };
};

const PING = 'PING';
const ping = () => ({ type: PING });
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const login = () => ({ type: LOGIN });
const logout = () => ({ type: LOGOUT });
// in tetsuya3850's repo he imports the (dispatch) function from ./reducers instead of mapping
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        ping,
        login,
        logout
    }, dispatch)
}

export default connect(mapStateToProps,
    mapDispatchToProps)(About);