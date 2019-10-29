import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import './style.scss';
import AuthDropdown from './AuthDropdown';

class Navigation extends Component {
  state = {
    collapsed: true //hamburger
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { loggedIn, user } = this.props;
    console.log(user);
    const { collapsed } = this.state;
    const targetClass = `collapse navbar-collapse ${!collapsed && 'show'}`;
    const togglerClass = `hamburger-btn ${collapsed ? 'collapsed' : ''}`;

    return (
      <nav className='Navigation'>
        <Link className='brand-logo' to='/' onClick={this.toggleCollapse}>HOME</Link>
        <button className={togglerClass} onClick={this.toggleCollapse} data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={targetClass}>
          <ul className='navbar-links'>
            <li className='nav-item'>
              <Link className='nav-link' to='/about' onClick={this.toggleCollapse}>About</Link>
            </li>
            {loggedIn &&
              <li className='nav-item'>
                <Link className='nav-link' to='/apiservice' onClick={this.toggleCollapse}>Private</Link>
              </li>
            }
          </ul>
          <ul className='navbar-user'>
            {loggedIn
              ? <AuthDropdown user={this.props.user.user} onClick={this.toggleCollapse} />
              : <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login' onClick={this.toggleCollapse}>Login</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register' onClick={this.toggleCollapse}>Register</Link>
                </li>
              </>}
          </ul>
        </div>
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

Navigation = connect(mapStateToProps, null)(Navigation);

export default Navigation;
