import React from 'react';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
/**
 * Component for displaying and managing individual tasks
 * @param {Object} props - Component props
 * @param {Object} props.task - The task object to display
 */
const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useAppContext();
  
  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };
  
  const handleDelete = () => {
    deleteTask(task.id);
  };
  
  return (
    <div className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-content">
        <input 
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="task-checkbox"
        />
        <div className="task-details">
          <h3 className="task-title">{task.title}</h3>
          {task.description && <p className="task-description">{task.description}</p>}
        </div>
      </div>
      <div className="task-actions">
        <button 
          className="btn btn-small btn-delete" 
          onClick={handleDelete}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
