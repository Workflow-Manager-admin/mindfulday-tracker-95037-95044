import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import { PRIORITY } from '../context/AppContext';
import TaskForm from './TaskForm';
import Button from './shared/Button';

// Helper function to get priority display properties
const getPriorityDisplay = (priority) => {
  switch (priority) {
    case PRIORITY.HIGH:
      return { label: 'High', className: 'priority-high' };
    case PRIORITY.MEDIUM:
      return { label: 'Medium', className: 'priority-medium' };
    case PRIORITY.LOW:
      return { label: 'priority-low', className: 'priority-low' };
    case PRIORITY.NONE:
    default:
      return { label: '', className: '' };
  }
};

// PUBLIC_INTERFACE
/**
 * Component for displaying and managing individual tasks
 * @param {Object} props - Component props
 * @param {Object} props.task - The task object to display
 * @param {boolean} props.compact - Whether to display in compact mode
 */
const TaskItem = ({ task, compact = false }) => {
  const { updateTask, deleteTask } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  
  const priorityInfo = getPriorityDisplay(task.priority);
  
  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };
  
  const handleDelete = () => {
    deleteTask(task.id);
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleFormCancel = () => {
    setIsEditing(false);
  };
  
  const handleFormSubmit = () => {
    setIsEditing(false);
  };
  
  // Cycle through priority levels
  const handleTogglePriority = () => {
    const priorityLevels = [PRIORITY.NONE, PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH];
    const currentIndex = priorityLevels.indexOf(task.priority || PRIORITY.NONE);
    const nextIndex = (currentIndex + 1) % priorityLevels.length;
    updateTask(task.id, { priority: priorityLevels[nextIndex] });
  };
  
  // If in edit mode, show the form instead
  if (isEditing) {
    return (
      <div className="task-item-edit">
        <TaskForm 
          initialTask={task} 
          onSubmit={handleFormSubmit} 
          onCancel={handleFormCancel} 
        />
      </div>
    );
  }
  
  return (
    <div className={`task-item ${task.completed ? 'task-completed' : ''} ${priorityInfo.className}`}>
      <div className="task-content">
        <input 
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="task-checkbox"
        />
        <div className="task-details">
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            {task.priority && task.priority !== PRIORITY.NONE && (
              <span className={`priority-badge ${priorityInfo.className}`}>
                {priorityInfo.label}
              </span>
            )}
          </div>
          {!compact && task.description && <p className="task-description">{task.description}</p>}
        </div>
      </div>
      
      <div className="task-actions">
        {!compact && (
          <Button 
            variant="text" 
            size="small"
            onClick={handleTogglePriority}
            aria-label="Change priority"
            title="Change priority"
          >
            Priority
          </Button>
        )}
        
        {!compact && (
          <Button 
            variant="text" 
            size="small"
            onClick={handleEditClick}
            aria-label="Edit task"
          >
            Edit
          </Button>
        )}
        
        <Button 
          variant="text" 
          size="small" 
          className="btn-delete" 
          onClick={handleDelete}
          aria-label="Delete task"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    priority: PropTypes.string,
    completed: PropTypes.bool
  }).isRequired,
  compact: PropTypes.bool
};

export default TaskItem;
