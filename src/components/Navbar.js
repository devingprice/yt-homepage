import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './Navbar.css';

import { userActions } from '../actions/user.actions';


class Navbar extends Component {
    logout = () => {
        this.props.dispatch(userActions.logout());
    };
    render() {
        const { loggedIn, user } = this.props;
        return (
            <nav className="navBar">
                <div className="navBar__left">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </div>

                {!loggedIn ?
                    <div className="navBar__right">
                        <Link to="/login" className="btn btn-link">Login</Link>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                    :
                    <div className="navBar__right">
                        <p>Username: {user.username}</p>
                        {/*<Link to="/login" className="btn btn-link">Logout</Link>*/}
                        <button onClick={()=> this.logout() }> Logout </button>
                    </div>
                }
            </nav>
        );
    }
}

const mapStateToProps = state => {
    const { loggedIn, user } = state.authentication;

    return {
        loggedIn,
        user
    };
};

Navbar = connect(mapStateToProps, null)(Navbar);

export default Navbar;