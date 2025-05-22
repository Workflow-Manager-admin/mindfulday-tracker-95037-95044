import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
/**
 * Header component that provides consistent navigation across the app
 * @param {Object} props - Component props
 * @param {boolean} props.transparent - Whether the header should be transparent
 */
const Header = ({ transparent = false }) => {
  const location = useLocation();
  
  const headerClasses = [
    'navbar',
    transparent ? 'navbar-transparent' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="logo-symbol">✦</span> MindfulDay
            </Link>
          </div>
          
          <nav className="main-nav">
            <ul className="nav-links">
              <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className={location.pathname === '/tasks' ? 'active' : ''}>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li className={location.pathname === '/journal' ? 'active' : ''}>
                <Link to="/journal">Journal</Link>
              </li>
            </ul>
          </nav>
          
          <Link to="/profile">
            <button className="btn btn-small">Profile</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  transparent: PropTypes.bool
};

export default Header;
