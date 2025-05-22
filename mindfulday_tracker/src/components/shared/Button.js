import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
/**
 * Reusable Button component with various style options
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant/style (default, primary, secondary, etc)
 * @param {string} props.size - Button size (small, medium, large)
 * @param {boolean} props.fullWidth - Whether the button should take up full width
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.rest - Additional props to pass to the button element
 */
const Button = ({ 
  variant = 'default', 
  size = 'medium', 
  fullWidth = false, 
  onClick, 
  children, 
  className = '',
  ...rest 
}) => {
  // Determine the CSS classes to apply based on props
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    size === 'large' ? 'btn-large' : '',
    size === 'small' ? 'btn-small' : '',
    fullWidth ? 'btn-full-width' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Button;
