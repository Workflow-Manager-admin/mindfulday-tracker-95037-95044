import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';
import PropTypes from 'prop-types';

// Mood options with emoji representations
const moodOptions = [
  { value: 'great', label: '😁', description: 'Great' },
  { value: 'good', label: '🙂', description: 'Good' },
  { value: 'okay', label: '😐', description: 'Okay' },
  { value: 'down', label: '🙁', description: 'Down' },
  { value: 'stressed', label: '😫', description: 'Stressed' },
];

// PUBLIC_INTERFACE
/**
 * Component for tracking and recording daily mood
 * @param {Object} props - Component props
 * @param {boolean} props.compact - Whether to display in compact mode for dashboard
 */
const MoodTracker = ({ compact = false }) => {
  const { reflections, addReflection } = useAppContext();
  const [selectedMood, setSelectedMood] = useState(null);
  
  const today = new Date().toISOString().split('T')[0];
  
  // Find today's mood reflection
  const todaysMoodReflection = reflections.find(r => 
    r.date === today && r.type === 'mood'
  );
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    
    // If there's already a mood reflection for today, we'll add a new one
    // In a real app, this might update the existing reflection instead
    addReflection({
      type: 'mood',
      mood: mood,
      date: today,
      notes: ''
    });
  };
  
  return (
    <div className={`mood-tracker ${compact ? 'compact' : ''}`}>
      {!compact && <h2>How are you feeling today?</h2>}
      {!compact && <p className="mood-date">{formatDate(new Date())}</p>}
      
      <div className="mood-options">
        {moodOptions.map(mood => (
          <button
            key={mood.value}
            className={`mood-option ${todaysMoodReflection?.mood === mood.value ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(mood.value)}
            aria-label={`Select mood: ${mood.description}`}
          >
            <span className="mood-emoji">{mood.label}</span>
            <span className="mood-label">{mood.description}</span>
          </button>
        ))}
      </div>
      
      {todaysMoodReflection?.mood && !compact && (
        <div className="mood-selected">
          <p>Today's mood: {moodOptions.find(m => m.value === todaysMoodReflection.mood)?.description}</p>
        </div>
      )}
    </div>
  );
};

MoodTracker.propTypes = {
  compact: PropTypes.bool
};

export default MoodTracker;
