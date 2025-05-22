import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import TaskList from './TaskList';
import Card from './shared/Card';

// PUBLIC_INTERFACE
/**
 * Component that combines task input and list display with filtering options
 * @param {Object} props - Component props
 * @param {boolean} props.compact - Whether to display in compact mode
 */
const TaskTracker = ({ compact = false }) => {
  const { tasks } = useAppContext();
  
  // Get today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate task statistics
  const todaysTasks = tasks.filter(task => task.date === today);
  const completedTasks = todaysTasks.filter(task => task.completed);
  const pendingTasks = todaysTasks.filter(task => !task.completed);
  
  // If compact mode, we'll just render the task list
  if (compact) {
    return <TaskList compact={true} limit={5} filter="today" />;
  }
  
  return (
    <div className="task-tracker">
      <div className="task-stats">
        <Card className="stat-card">
          <div className="stat-value">{todaysTasks.length}</div>
          <div className="stat-label">Total Tasks</div>
        </Card>
        
        <Card className="stat-card">
          <div className="stat-value">{completedTasks.length}</div>
          <div className="stat-label">Completed</div>
        </Card>
        
        <Card className="stat-card">
          <div className="stat-value">{pendingTasks.length}</div>
          <div className="stat-label">Pending</div>
        </Card>
      </div>
      
      <TaskList />
    </div>
  );
};

TaskTracker.propTypes = {
  compact: PropTypes.bool
};

export default TaskTracker;
