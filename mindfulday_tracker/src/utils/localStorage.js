/**
 * Utility functions for working with localStorage
 * This file provides consistent methods for saving and retrieving data from localStorage
 */

// PUBLIC_INTERFACE
/**
 * Save data to localStorage with the given key
 * @param {string} key - The key to use for storing the data
 * @param {any} data - The data to store (will be JSON stringified)
 */
export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// PUBLIC_INTERFACE
/**
 * Load data from localStorage by key
 * @param {string} key - The key to retrieve data from
 * @param {any} defaultValue - Default value to return if key doesn't exist
 * @returns {any} The parsed data or defaultValue if key doesn't exist
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// PUBLIC_INTERFACE
/**
 * Remove data from localStorage by key
 * @param {string} key - The key to remove
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// PUBLIC_INTERFACE
/**
 * Clear all app-related data from localStorage
 * @param {Array<string>} keysToPreserve - Keys that should not be cleared (optional)
 */
export const clearLocalStorage = (keysToPreserve = []) => {
  try {
    if (keysToPreserve.length === 0) {
      localStorage.clear();
      return true;
    }
    
    // Get all keys
    const allKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      allKeys.push(localStorage.key(i));
    }
    
    // Remove all except preserved keys
    allKeys
      .filter(key => !keysToPreserve.includes(key))
      .forEach(key => localStorage.removeItem(key));
    
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
