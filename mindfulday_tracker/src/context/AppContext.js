import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

// Create the context
const AppContext = createContext();

// Constants for localStorage keys
const TASKS_KEY = 'mindfulday_tasks';
const REFLECTIONS_KEY = 'mindfulday_reflections';
const USER_SETTINGS_KEY = 'mindfulday_settings';

// Task priority levels
export const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  NONE: 'none'
};

// PUBLIC_INTERFACE
/**
 * Provider component for the app's global state
 * Uses localStorage for data persistence
 */
export const AppProvider = ({ children }) => {
  // State for tasks, reflections and user settings
  const [tasks, setTasks] = useState(() => loadFromLocalStorage(TASKS_KEY, []));
  const [reflections, setReflections] = useState(() => loadFromLocalStorage(REFLECTIONS_KEY, []));
  const [userSettings, setUserSettings] = useState(() => loadFromLocalStorage(USER_SETTINGS_KEY, {
    theme: 'auto',
    notifications: true
  }));

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage(TASKS_KEY, tasks);
  }, [tasks]);

  useEffect(() => {
    saveToLocalStorage(REFLECTIONS_KEY, reflections);
  }, [reflections]);

  useEffect(() => {
    saveToLocalStorage(USER_SETTINGS_KEY, userSettings);
  }, [userSettings]);

  // Task-related functions
  const addTask = (task) => {
    const newTask = {
      id: uuidv4(),
      ...task,
      priority: task.priority || PRIORITY.NONE,
      createdAt: new Date().toISOString(),
      completed: false
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  // Get tasks filtered by various criteria
  const getFilteredTasks = (filters = {}) => {
    return tasks.filter(task => {
      // Filter by date if specified
      if (filters.date && task.date !== filters.date) {
        return false;
      }
      
      // Filter by completion status if specified
      if (filters.completed !== undefined && task.completed !== filters.completed) {
        return false;
      }
      
      // Filter by priority if specified
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      
      return true;
    });
  };
  
  // Sort tasks by priority (high to low)
  const sortTasksByPriority = (tasksToSort) => {
    const priorityOrder = {
      [PRIORITY.HIGH]: 1,
      [PRIORITY.MEDIUM]: 2,
      [PRIORITY.LOW]: 3,
      [PRIORITY.NONE]: 4
    };
    
    return [...tasksToSort].sort((a, b) => {
      // First sort by priority
      const priorityComparison = priorityOrder[a.priority || PRIORITY.NONE] - 
                                priorityOrder[b.priority || PRIORITY.NONE];
      
      if (priorityComparison !== 0) {
        return priorityComparison;
      }
      
      // Then by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  // Reflection-related functions
  const addReflection = (reflection) => {
    const newReflection = {
      id: uuidv4(),
      ...reflection,
      createdAt: new Date().toISOString()
    };
    setReflections(prevReflections => [...prevReflections, newReflection]);
    return newReflection;
  };

  const updateReflection = (reflectionId, updates) => {
    setReflections(prevReflections => 
      prevReflections.map(reflection => 
        reflection.id === reflectionId ? { ...reflection, ...updates } : reflection
      )
    );
  };

  // Settings functions
  const updateSettings = (newSettings) => {
    setUserSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  // Create the context value object
  const contextValue = {
    // Task data and methods
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getFilteredTasks,
    sortTasksByPriority,
    
    // Reflection data and methods
    reflections,
    addReflection,
    updateReflection,
    
    // Settings data and methods
    userSettings,
    updateSettings
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook to use the app context
 * @returns {Object} The app context value
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
