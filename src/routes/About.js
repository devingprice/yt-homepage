import React from 'react';
import {connect} from 'react-redux';

import { bindActionCreators } from 'redux';

class About extends React.Component {
    clickPing = () => {
        console.log('click ping');
        this.props.ping();
    };
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
        isPinging: state.ping.isPinging
    };
};

const PING = 'PING';
const ping = () => ({ type: PING });

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        ping
    }, dispatch)
};

export default connect(mapStateToProps,
    mapDispatchToProps)(About);