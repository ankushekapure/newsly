import './Navbar.css';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    // State for managing menu open/close
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Function to toggle the menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Function to close the menu
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className='navbar'>
            {/* Menu icon for mobile */}
            <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            {/* Navigation links */}
            <ul className={`links ${menuOpen ? 'active' : ''}`}>
                <li className="nav-item">
                    <Link to="/" className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`} onClick={closeMenu}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/business" className={`nav-link ${location.pathname === "/business" ? "active-link" : ""}`} onClick={closeMenu}>Business</Link>
                </li>
                <li className="nav-item">
                    <Link to="/entertainment" className={`nav-link ${location.pathname === "/entertainment" ? "active-link" : ""}`} onClick={closeMenu}>Entertainment</Link>
                </li>
                <li className="nav-item">
                    <Link to="/general" className={`nav-link ${location.pathname === "/general" ? "active-link" : ""}`} onClick={closeMenu}>General</Link>
                </li>
                <li className="nav-item">
                    <Link to="health" className={`nav-link ${location.pathname === "/health" ? "active-link" : ""}`} onClick={closeMenu}>Health</Link>
                </li>
                <li className="nav-item">
                    <Link to="science" className={`nav-link ${location.pathname === "/science" ? "active-link" : ""}`} onClick={closeMenu}>Science</Link>
                </li>
                <li className="nav-item">
                    <Link to="sports" className={`nav-link ${location.pathname === "/sports" ? "active-link" : ""}`} onClick={closeMenu}>Sports</Link>
                </li>
                <li className="nav-item">
                    <Link to="technology" className={`nav-link ${location.pathname === "/technology" ? "active-link" : ""}`} onClick={closeMenu}>Technology</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
