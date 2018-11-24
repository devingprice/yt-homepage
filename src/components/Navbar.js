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
                    <Link to="/" className="nav__link">Home</Link>
                    <Link to="/about" className="nav__link">About</Link>
                </div>

                {!loggedIn ?
                    <div className="navBar__right">
                        <Link to="/login" className="nav__link">Login</Link>
                        <Link to="/register" className="nav__link">Register</Link>
                    </div>
                    :
                    <div className="navBar__right">
                        <a className="nav__link">Username: {user.username}</a>
                        {/*<Link to="/login" className="btn btn-link">Logout</Link>*/}
                        <a onClick={()=> this.logout() } className="nav__link"> Logout </a>
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