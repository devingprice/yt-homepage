import React, { Component } from 'react';
import { connect } from 'react-redux';

//import routes from './routes';

import { alertActions } from './actions/alert.actions';
import Navbar from './components/Navbar';

class AlertWrapper extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        this.props.history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    render() {
        const { alert } = this.props;
        console.log(alert);
        return (
            <div className="wrapperApp">
                {
                    alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Navbar/>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(AlertWrapper);

export default connectedApp;
