import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';

//import routes from './routes';

import { alertActions } from '../actions/alert.actions';
//import Navbar from './Navbar'; <Navbar />
// import Navigation from './Navigation/Navigation';

export default (props) => {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

    props.history.listen((location, action) => {
        // clear alert on location change
        dispatch(alertActions.clear());
    });
    
    if(alert.message){
        console.log(alert);
    }
        
    return (
        <div className="wrapperApp">
            {
                alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            
            {/* <Navigation /> */}
            {props.children}
        </div>
    );
    
}
