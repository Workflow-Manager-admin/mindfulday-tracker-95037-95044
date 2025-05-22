import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';
import Button from './shared/Button';

// PUBLIC_INTERFACE
/**
 * Component for recording daily reflections and insights
 * @param {Object} props - Component props
 * @param {string} props.selectedPrompt - An optional prompt to prefill
 * @param {string} props.promptCategory - The category of the selected prompt
 */
const ReflectionForm = ({ selectedPrompt, promptCategory }) => {
  const { reflections, addReflection, updateReflection } = useAppContext();
  
  const [formData, setFormData] = useState({
    gratitude: '',
    lessons: '',
    intentions: '',
    notes: ''
  });
  
  const today = new Date().toISOString().split('T')[0];
  const todaysReflection = reflections.find(r => 
    r.date === today && r.type === 'daily-reflection'
  );
  
  // Load existing reflection if there is one for today
  useEffect(() => {
    if (todaysReflection) {
      setFormData({
        gratitude: todaysReflection.gratitude || '',
        lessons: todaysReflection.lessons || '',
        intentions: todaysReflection.intentions || '',
        notes: todaysReflection.notes || ''
      });
    }
  }, [todaysReflection]);
  
  // Handle prompt selection
  const applyPrompt = useCallback((prompt, category) => {
    if (!prompt) return;
    
    // Determine which field to update based on the category
    let fieldToUpdate = 'notes'; // default
    
    if (category === 'gratitude') fieldToUpdate = 'gratitude';
    else if (category === 'growth') fieldToUpdate = 'lessons';
    else if (category === 'intention') fieldToUpdate = 'intentions';
    
    setFormData(prev => ({
      ...prev,
      [fieldToUpdate]: prompt
    }));
  }, []);
  
  // Apply selected prompt if provided
  useEffect(() => {
    if (selectedPrompt) {
      applyPrompt(selectedPrompt, promptCategory);
    }
  }, [selectedPrompt, promptCategory, applyPrompt]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (todaysReflection) {
      // Update existing reflection
      updateReflection(todaysReflection.id, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Create new reflection
      addReflection({
        type: 'daily-reflection',
        date: today,
        ...formData
      });
    }
  };
  
  return (
    <div className="reflection-container">
      <h2>Daily Reflection</h2>
      <p className="reflection-date">{formatDate(new Date())}</p>
      
      <form className="reflection-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gratitude">What are you grateful for today?</label>
          <textarea
            id="gratitude"
            name="gratitude"
            value={formData.gratitude}
            onChange={handleChange}
            rows={3}
            placeholder="List three things you're grateful for..."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lessons">What did you learn today?</label>
          <textarea
            id="lessons"
            name="lessons"
            value={formData.lessons}
            onChange={handleChange}
            rows={3}
            placeholder="Reflect on any insights or lessons..."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="intentions">What are your intentions for tomorrow?</label>
          <textarea
            id="intentions"
            name="intentions"
            value={formData.intentions}
            onChange={handleChange}
            rows={3}
            placeholder="Set your intentions for the next day..."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Additional notes or thoughts</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any other thoughts, feelings, or observations..."
          />
        </div>
        
        <Button type="submit" size="large">
          {todaysReflection ? 'Update Reflection' : 'Save Reflection'}
        </Button>
      </form>
    </div>
  );
};

ReflectionForm.propTypes = {
  selectedPrompt: PropTypes.string,
  promptCategory: PropTypes.string
};

export default ReflectionForm;
