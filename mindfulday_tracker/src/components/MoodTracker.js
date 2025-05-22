import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatDate, getRelativeDay } from '../utils/dateUtils';
import PropTypes from 'prop-types';

// Mood options with emoji representations
const moodOptions = [
  { value: 'great', label: '😁', description: 'Great' },
  { value: 'good', label: '🙂', description: 'Good' },
  { value: 'okay', label: '😐', description: 'Okay' },
  { value: 'down', label: '🙁', description: 'Down' },
  { value: 'stressed', label: '😫', description: 'Stressed' },
];

// Helper to get mood option by value
const getMoodOption = (value) => moodOptions.find(m => m.value === value) || null;

// PUBLIC_INTERFACE
/**
 * Component for tracking and recording daily mood
 * @param {Object} props - Component props
 * @param {boolean} props.compact - Whether to display in compact mode for dashboard
 */
const MoodTracker = ({ compact = false }) => {
  const { reflections, addReflection, updateReflection } = useAppContext();
  
  const today = new Date().toISOString().split('T')[0];
  
  // Find today's mood reflection
  const todaysMoodReflection = reflections.find(r => 
    r.date === today && r.type === 'mood'
  );
  
  // Get mood history for past 7 days (including today)
  const moodHistory = useMemo(() => {
    const dates = [];
    const currentDate = new Date();
    
    // Generate array of dates for the past 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      dates.push({
        date: dateString,
        formattedDate: getRelativeDay(date),
        isoDate: date.toISOString(),
      });
    }
    
    // Map dates to mood reflections
    return dates.map(dateInfo => {
      const moodForDate = reflections.find(r => 
        r.date === dateInfo.date && r.type === 'mood'
      );
      
      return {
        ...dateInfo,
        mood: moodForDate?.mood || null,
        moodInfo: moodForDate?.mood ? getMoodOption(moodForDate.mood) : null,
        reflectionId: moodForDate?.id || null,
      };
    });
  }, [reflections]);
  
  // Handle mood selection
  const handleMoodSelect = (mood) => {
    if (todaysMoodReflection) {
      // Update existing mood reflection for today
      updateReflection(todaysMoodReflection.id, {
        mood: mood,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Create new mood reflection
      addReflection({
        type: 'mood',
        mood: mood,
        date: today,
        notes: ''
      });
    }
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
          <p>Today's mood: {getMoodOption(todaysMoodReflection.mood)?.description}</p>
        </div>
      )}

      {/* Show mood history when not in compact mode */}
      {!compact && (
        <div className="mood-history">
          <h3>Your Mood History</h3>
          <div className="mood-timeline">
            {moodHistory.map((day) => (
              <div key={day.date} className="mood-day">
                <div className="mood-day-date">{day.formattedDate}</div>
                <div className="mood-day-emoji">
                  {day.moodInfo ? (
                    <span title={`${day.moodInfo.description}`}>
                      {day.moodInfo.label}
                    </span>
                  ) : (
                    <span className="mood-day-empty">–</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

MoodTracker.propTypes = {
  compact: PropTypes.bool
};

export default MoodTracker;
