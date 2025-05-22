import React from 'react';
import PropTypes from 'prop-types';
import Card from './shared/Card';
import Button from './shared/Button';
import { formatDate } from '../utils/dateUtils';

// PUBLIC_INTERFACE
/**
 * Component for displaying a single reflection in detail
 * @param {Object} props - Component props
 * @param {Object} props.reflection - The reflection object to display
 * @param {Function} props.onBack - Callback function for back button
 */
const ReflectionDetail = ({ reflection, onBack }) => {
  if (!reflection) {
    return (
      <div className="reflection-detail-empty">
        <p>Select a reflection to view details</p>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Back to List
          </Button>
        )}
      </div>
    );
  }

  // Format the reflection date
  const formattedDate = formatDate(new Date(reflection.date));

  return (
    <div className="reflection-detail">
      <div className="reflection-detail-header">
        <h2>Reflection</h2>
        <p className="reflection-date">{formattedDate}</p>
        
        {reflection.mood && (
          <div className="reflection-mood">
            <span className="mood-label">Mood: </span>
            <span className="mood-emoji">
              {reflection.mood === 'great' && '😁'}
              {reflection.mood === 'good' && '🙂'}
              {reflection.mood === 'okay' && '😐'}
              {reflection.mood === 'down' && '🙁'}
              {reflection.mood === 'stressed' && '😫'}
            </span>
          </div>
        )}
      </div>

      <div className="reflection-detail-content">
        {reflection.gratitude && (
          <Card title="Gratitude" className="reflection-section">
            <p>{reflection.gratitude}</p>
          </Card>
        )}
        
        {reflection.lessons && (
          <Card title="Lessons & Insights" className="reflection-section">
            <p>{reflection.lessons}</p>
          </Card>
        )}
        
        {reflection.intentions && (
          <Card title="Intentions" className="reflection-section">
            <p>{reflection.intentions}</p>
          </Card>
        )}
        
        {reflection.notes && (
          <Card title="Additional Notes" className="reflection-section">
            <p>{reflection.notes}</p>
          </Card>
        )}
      </div>
      
      {onBack && (
        <div className="reflection-detail-actions">
          <Button onClick={onBack}>
            Back to Reflections
          </Button>
        </div>
      )}
    </div>
  );
};

ReflectionDetail.propTypes = {
  reflection: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    type: PropTypes.string,
    mood: PropTypes.string,
    gratitude: PropTypes.string,
    lessons: PropTypes.string,
    intentions: PropTypes.string,
    notes: PropTypes.string
  }),
  onBack: PropTypes.func
};

export default ReflectionDetail;
