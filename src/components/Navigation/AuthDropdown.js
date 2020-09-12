import React, { useState } from 'react';
import './style.scss';

const AuthDropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const user = props.user;
    const handleLogout = props.onClick;
    const toggleOpen = () => {setIsOpen(!isOpen)}

    const dropdownMenuClass = `dropdown-menu dropdown-menu-right ${isOpen && 'show'}`;

    return (
        <li className="nav-item dropdown">
            <button className="dropdown-toggle" onClick={toggleOpen}>
                {user.email}
            </button>
            <ul className={dropdownMenuClass}>
                <li className="dropdown-item" onClick={handleLogout}>Logout</li>
            </ul>
        </li>
    ); 
}

export default AuthDropdown;
