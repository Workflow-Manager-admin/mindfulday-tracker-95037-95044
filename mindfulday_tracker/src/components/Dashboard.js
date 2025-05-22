import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { formatDate, getRelativeDay } from '../utils/dateUtils';
import Card from './shared/Card';
import TaskList from './TaskList';
import MoodTracker from './MoodTracker';

// PUBLIC_INTERFACE
/**
 * Dashboard component showing summary of tasks, mood, and reflection for the day
 */
const Dashboard = () => {
  const { tasks, reflections } = useAppContext();
  
  // Get today's date in YYYY-MM-DD format for filtering
  const today = new Date().toISOString().split('T')[0];
  
  // Filter tasks for today
  const todaysTasks = tasks.filter(task => task.date === today);
  const completedTasksCount = todaysTasks.filter(task => task.completed).length;
  const tasksProgress = todaysTasks.length > 0 
    ? Math.round((completedTasksCount / todaysTasks.length) * 100) 
    : 0;
    
  // Check if user has recorded mood today
  const hasMoodToday = reflections.some(r => r.date === today && r.type === 'mood');
  
  // Check if user has done reflection today
  const hasReflectionToday = reflections.some(r => r.date === today && r.type === 'daily-reflection');
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="date-display">{formatDate(new Date())}</p>
      </div>
      
      <div className="dashboard-summary">
        <Card title="Daily Progress" className="progress-card">
          <div className="progress-stats">
            <div className="progress-item">
              <span className="progress-label">Tasks</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${tasksProgress}%` }}
                  aria-valuenow={tasksProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="progress-text">{completedTasksCount}/{todaysTasks.length} completed</span>
            </div>
            
            <div className="progress-item">
              <span className="progress-label">Mood</span>
              <div className="progress-indicator">
                {hasMoodToday ? (
                  <span className="indicator-complete">✓</span>
                ) : (
                  <span className="indicator-incomplete">○</span>
                )}
              </div>
            </div>
            
            <div className="progress-item">
              <span className="progress-label">Reflection</span>
              <div className="progress-indicator">
                {hasReflectionToday ? (
                  <span className="indicator-complete">✓</span>
                ) : (
                  <span className="indicator-incomplete">○</span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <Card title="Today's Tasks">
            <TaskList compact={true} limit={5} />
            <div className="card-footer">
              <Link to="/tasks" className="view-all-link">View all tasks</Link>
            </div>
          </Card>
        </div>
        
        <div className="dashboard-column">
          <Card title="How are you feeling?">
            <MoodTracker compact={true} />
            <div className="card-footer">
              <Link to="/journal" className="view-all-link">Go to Journal</Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
