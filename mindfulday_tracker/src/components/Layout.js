import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

// PUBLIC_INTERFACE
/**
 * Layout component that provides consistent structure across all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render inside the layout
 * @param {string} props.title - Page title (optional)
 * @param {boolean} props.transparentHeader - Whether the header should be transparent (optional)
 */
const Layout = ({ children, title, transparentHeader = false }) => {
  return (
    <>
      <Header transparent={transparentHeader} />

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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  transparentHeader: PropTypes.bool
};

export default Layout;
