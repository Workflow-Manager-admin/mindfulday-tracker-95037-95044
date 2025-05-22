import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MoodTracker from './MoodTracker';
import ReflectionForm from './ReflectionForm';
import ReflectionHistory from './ReflectionHistory';
import ReflectionPrompts from './ReflectionPrompts';
import Card from './shared/Card';
import Button from './shared/Button';

// PUBLIC_INTERFACE
/**
 * Combined component for reflection activities including mood tracking and journaling
 * @param {Object} props - Component props
 * @param {boolean} props.compact - Whether to display in compact mode
 */
const Reflection = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState('current');

  if (compact) {
    return <MoodTracker compact={true} />;
  }
  
  // Handle selecting a reflection prompt
  const handleSelectPrompt = (prompt, category) => {
    // Ensure the current tab is active when a prompt is selected
    setActiveTab('current');
  };
  
  return (
    <div className="reflection-wrapper">
      <div className="reflection-tabs">
        <Button 
          variant={activeTab === 'current' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('current')}
          className="tab-button"
        >
          Today's Reflection
        </Button>
        <Button 
          variant={activeTab === 'history' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('history')}
          className="tab-button"
        >
          Reflection History
        </Button>
      </div>
      
      {activeTab === 'current' ? (
        <>
          <Card title="Mood Tracking">
            <MoodTracker />
          </Card>
          
          <div className="reflection-content-grid">
            <div className="reflection-main">
              <Card title="Daily Reflection">
                <ReflectionForm />
              </Card>
            </div>
            
            <div className="reflection-sidebar">
              <Card title="Reflection Prompts">
                <ReflectionPrompts onSelectPrompt={handleSelectPrompt} />
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Card>
          <ReflectionHistory />
        </Card>
      )}
    </div>
  );
};

Reflection.propTypes = {
  compact: PropTypes.bool
};

export default Reflection;
