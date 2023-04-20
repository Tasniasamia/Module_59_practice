import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
    return (
        <div className='container d-flex justify-content-center'>
        <div className='navbar2 '>
            <Link to="/">Home</Link>
            <Link to="/Resister">Resister</Link>
            <Link to="/Login">Login</Link>

            
        </div></div>
    );
};

export default Header;