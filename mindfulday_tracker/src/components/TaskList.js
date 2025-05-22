import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { useAppContext } from '../context/AppContext';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
/**
 * Component for displaying and managing a list of tasks
 * Includes functionality to add new tasks
 * @param {Object} props - Component props
 * @param {boolean} props.compact - Whether to display the list in compact mode
 * @param {number} props.limit - Maximum number of tasks to display
 * @param {string} props.filter - Filter tasks by "today", "all", or a specific date
 */
const TaskList = ({ compact = false, limit = 0, filter = 'today' }) => {
  const { tasks, addTask } = useAppContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  // Filter tasks based on props
  const today = new Date().toISOString().split('T')[0];
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'today') return task.date === today;
    if (filter === 'all') return true;
    return task.date === filter; // If filter is a specific date
  });
  
  // Limit the number of tasks if specified
  const displayTasks = limit > 0 ? filteredTasks.slice(0, limit) : filteredTasks;
  
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        date: new Date().toISOString().split('T')[0],
      });
      setNewTaskTitle('');
    }
  };
  
  return (
    <div className={`task-list-container ${compact ? 'compact' : ''}`}>
      {!compact && <h2>Today's Tasks</h2>}
      
      {!compact && (
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button type="submit" className="btn">Add Task</button>
        </form>
      )}
      
      <div className="task-list">
        {displayTasks.length === 0 ? (
          <p className="no-tasks-message">No tasks for today. Add one to get started!</p>
        ) : (
          displayTasks.map(task => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  compact: PropTypes.bool,
  limit: PropTypes.number,
  filter: PropTypes.string
};

export default TaskList;
