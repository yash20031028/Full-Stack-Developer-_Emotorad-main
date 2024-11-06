import React from 'react';
import './Navbar.css';

const Navbar = ({ user }) => (
    <div className="navbar">
        <h3>Welcome, {user?.name}</h3>
        <img src={user?.picture} alt="User" className="user-avatar" />
    </div>
);

export default Navbar;
