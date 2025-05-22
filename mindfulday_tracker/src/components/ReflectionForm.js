import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';

// PUBLIC_INTERFACE
/**
 * Component for recording daily reflections and insights
 */
const ReflectionForm = () => {
  const { reflections, addReflection, updateReflection } = useAppContext();
  
  const [formData, setFormData] = useState({
    gratitude: '',
    lessons: '',
    intentions: ''
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
        intentions: todaysReflection.intentions || ''
      });
    }
  }, [todaysReflection]);
  
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
        
        <button type="submit" className="btn btn-large">
          {todaysReflection ? 'Update Reflection' : 'Save Reflection'}
        </button>
      </form>
    </div>
  );
};

export default ReflectionForm;
