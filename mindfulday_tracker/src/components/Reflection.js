import React from 'react';
import PropTypes from 'prop-types';
import MoodTracker from './MoodTracker';
import ReflectionForm from './ReflectionForm';
import Card from './shared/Card';

// PUBLIC_INTERFACE
/**
 * Combined component for reflection activities including mood tracking and journaling
 * @param {Object} props - Component props
 * @param {boolean} props.compact - Whether to display in compact mode
 */
const Reflection = ({ compact = false }) => {
  if (compact) {
    return <MoodTracker compact={true} />;
  }
  
  return (
    <div className="reflection-wrapper">
      <Card title="Mood Tracking">
        <MoodTracker />
      </Card>
      
      <Card title="Daily Reflection">
        <ReflectionForm />
      </Card>
    </div>
  );
};

Reflection.propTypes = {
  compact: PropTypes.bool
};

export default Reflection;
