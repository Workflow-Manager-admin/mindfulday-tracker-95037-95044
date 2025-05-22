import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Layout component that provides consistent structure across all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render inside the layout
 * @param {string} props.title - Page title (optional)
 */
const Layout = ({ children, title }) => {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="logo-symbol">*</span> MindfulDay
              </Link>
            </div>
            <div>
              <Link to="/journal">
                <button className="btn">My Journal</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {title && (
          <div className="page-header container">
            <h1>{title}</h1>
          </div>
        )}
        {children}
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MindfulDay Tracker</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
