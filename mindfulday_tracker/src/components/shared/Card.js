import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
/**
 * Card component for displaying content in a consistent container
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title (optional)
 * @param {boolean} props.padded - Whether to add padding to the card content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.rest - Additional props to pass to the card element
 */
const Card = ({ 
  children, 
  title, 
  padded = true, 
  className = '',
  ...rest 
}) => {
  const cardClasses = [
    'card',
    padded ? 'card-padded' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...rest}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  padded: PropTypes.bool,
  className: PropTypes.string
};

export default Card;
