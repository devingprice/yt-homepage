import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import './style.scss';
import AuthDropdown from './AuthDropdown';

const Navigation = () => {
    const loggedIn = useSelector(state => state.authentication.loggedIn);
    const user = useSelector(state => state.authentication.user);
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    }

    const targetClass = `collapse navbar-collapse ${!collapsed && 'show'}`;
    const togglerClass = `hamburger-btn ${collapsed ? 'collapsed' : ''}`;

    return (
        <nav className='Navigation'>
            <Link className='brand-logo' to='/' onClick={toggleCollapse}>HOME</Link>
            <button className={togglerClass} onClick={toggleCollapse} data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={targetClass}>
                <ul className='navbar-links'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/about' onClick={toggleCollapse}>About</Link>
                    </li>
                    {loggedIn &&
                        <li className='nav-item'>
                            <Link className='nav-link' to='/apiservice' onClick={toggleCollapse}>Private</Link>
                        </li>
                    }
                </ul>
                <ul className='navbar-user'>
                    {loggedIn
                        ? <AuthDropdown user={user} onClick={toggleCollapse} />
                        : <>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/login' onClick={toggleCollapse}>Login</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/register' onClick={toggleCollapse}>Register</Link>
                        </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}
export default Navigation;
