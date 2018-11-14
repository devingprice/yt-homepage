import React from 'react';
import {connect} from 'react-redux';

import { bindActionCreators } from 'redux';

const PING = 'PING';
const ping = () => ({ type: PING });
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
    render(){
        return (
            <div>
                <h1>is pinging: {this.props.isPinging.toString()}</h1>
                <button onClick={() => this.clickPing()}>Start PING</button>
                <button onClick={() => console.log('log')}>Start LOG</button>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        isPinging: state.pingReducer.isPinging
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        ping
    },dispatch)
}

export default connect(mapStateToProps,
    mapDispatchToProps)(About);