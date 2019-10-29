import React, { Component } from 'react';
import './style.scss';

class AuthDropdown extends Component {
  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    this.props.onClick();
  }

  render() {
    const { user } = this.props;
    const { isOpen } = this.state;

    const dropdownMenuClass = `dropdown-menu dropdown-menu-right ${isOpen && 'show'}`;

    return (
      <li className="nav-item dropdown">
        <button className="dropdown-toggle" onClick={this.toggleOpen}>
          {user.email}
        </button>
        <ul className={dropdownMenuClass}>
          <li className="dropdown-item" onClick={this.handleLogout}>Logout</li>
        </ul>
      </li>
    );
  }
}

export default AuthDropdown;
