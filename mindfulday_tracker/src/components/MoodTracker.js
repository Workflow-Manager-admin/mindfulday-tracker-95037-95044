import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';

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
 */
const MoodTracker = () => {
  const { reflections, addReflection } = useAppContext();
  const [selectedMood, setSelectedMood] = useState(null);
  
  const today = new Date().toISOString().split('T')[0];
  const todaysReflection = reflections.find(r => r.date === today);
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    
    // If there's already a reflection for today, we'll add the mood
    // In a real app, this might update the existing reflection instead
    addReflection({
      type: 'mood',
      mood: mood,
      date: today,
      notes: ''
    });
  };
  
  return (
    <div className="mood-tracker">
      <h2>How are you feeling today?</h2>
      <p className="mood-date">{formatDate(new Date())}</p>
      
      <div className="mood-options">
        {moodOptions.map(mood => (
          <button
            key={mood.value}
            className={`mood-option ${todaysReflection?.mood === mood.value ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(mood.value)}
            aria-label={`Select mood: ${mood.description}`}
          >
            <span className="mood-emoji">{mood.label}</span>
            <span className="mood-label">{mood.description}</span>
          </button>
        ))}
      </div>
      
      {todaysReflection?.mood && (
        <div className="mood-selected">
          <p>Today's mood: {moodOptions.find(m => m.value === todaysReflection.mood)?.description}</p>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
