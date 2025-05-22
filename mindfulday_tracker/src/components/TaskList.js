import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
/**
 * Component for displaying and managing a list of tasks
 * Includes functionality to add new tasks
 */
const TaskList = () => {
  const { tasks, addTask } = useAppContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
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
    <div className="task-list-container">
      <h2>Today's Tasks</h2>
      
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
      
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks-message">No tasks for today. Add one to get started!</p>
        ) : (
          tasks.map(task => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default TaskList;
