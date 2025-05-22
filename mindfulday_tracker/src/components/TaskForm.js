import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import { PRIORITY } from '../context/AppContext';
import Button from './shared/Button';

// PUBLIC_INTERFACE
/**
 * Form component for creating and editing tasks
 * @param {Object} props - Component props
 * @param {Object} props.initialTask - Initial task data for editing mode (optional)
 * @param {Function} props.onSubmit - Callback function after successful submission (optional)
 * @param {Function} props.onCancel - Callback function for form cancellation (optional)
 * @param {boolean} props.inline - Whether to display the form inline (compact)
 */
const TaskForm = ({ initialTask = null, onSubmit, onCancel, inline = false }) => {
  const { addTask, updateTask } = useAppContext();
  const isEditMode = Boolean(initialTask?.id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    priority: PRIORITY.NONE
  });

  const [errors, setErrors] = useState({});
  
  // Load initial task data if provided
  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title || '',
        description: initialTask.description || '',
        date: initialTask.date || new Date().toISOString().split('T')[0],
        priority: initialTask.priority || PRIORITY.NONE
      });
    }
  }, [initialTask]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handlePriorityChange = (priority) => {
    setFormData(prev => ({ ...prev, priority }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (isEditMode) {
      // Update existing task
      updateTask(initialTask.id, formData);
    } else {
      // Create new task
      addTask(formData);
    }
    
    // Reset form
    if (!isEditMode) {
      setFormData({
        title: '',
        description: '',
        date: formData.date, // Keep the selected date
        priority: PRIORITY.NONE
      });
    }
    
    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit();
    }
  };
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  
  // Render a more compact form if inline is true
  if (inline) {
    return (
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add a new task..."
          value={formData.title}
          onChange={handleChange}
          className={`task-input ${errors.title ? 'input-error' : ''}`}
        />
        <div className="inline-priority-selector">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="priority-select-small"
          >
            <option value={PRIORITY.NONE}>No Priority</option>
            <option value={PRIORITY.LOW}>Low</option>
            <option value={PRIORITY.MEDIUM}>Medium</option>
            <option value={PRIORITY.HIGH}>High</option>
          </select>
        </div>
        <Button type="submit">{isEditMode ? 'Update' : 'Add Task'}</Button>
      </form>
    );
  }
  
  // Full form with all fields
  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title*</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'input-error' : ''}
            placeholder="Enter task title"
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
            rows={3}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="date">Date*</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'input-error' : ''}
            />
            {errors.date && <div className="error-message">{errors.date}</div>}
          </div>
          
          <div className="form-group half-width">
            <label>Priority</label>
            <div className="priority-options">
              <button 
                type="button" 
                className={`priority-option ${formData.priority === PRIORITY.HIGH ? 'selected' : ''}`}
                onClick={() => handlePriorityChange(PRIORITY.HIGH)}
              >
                High
              </button>
              <button 
                type="button" 
                className={`priority-option ${formData.priority === PRIORITY.MEDIUM ? 'selected' : ''}`}
                onClick={() => handlePriorityChange(PRIORITY.MEDIUM)}
              >
                Medium
              </button>
              <button 
                type="button" 
                className={`priority-option ${formData.priority === PRIORITY.LOW ? 'selected' : ''}`}
                onClick={() => handlePriorityChange(PRIORITY.LOW)}
              >
                Low
              </button>
              <button 
                type="button" 
                className={`priority-option ${formData.priority === PRIORITY.NONE ? 'selected' : ''}`}
                onClick={() => handlePriorityChange(PRIORITY.NONE)}
              >
                None
              </button>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">
            {isEditMode ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  initialTask: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    priority: PropTypes.string
  }),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  inline: PropTypes.bool
};

export default TaskForm;
