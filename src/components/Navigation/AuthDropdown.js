import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import './style.scss';

import { userActions } from '../../actions/user.actions';

const AuthDropdown = (props) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    
    const logout = () => {dispatch(userActions.logout()) }
    const toggleOpen = () => {setIsOpen(!isOpen)}

    const dropdownMenuClass = `dropdown-menu dropdown-menu-right ${isOpen && 'show'}`;

    return (
        <li className="nav-item dropdown">
            <button className="dropdown-toggle" onClick={toggleOpen}>
                {props.user.email}
            </button>
            <ul className={dropdownMenuClass}>
                <li className="dropdown-item" onClick={logout}>Logout</li>
            </ul>
        </li>
    ); 
}

export default AuthDropdown;
