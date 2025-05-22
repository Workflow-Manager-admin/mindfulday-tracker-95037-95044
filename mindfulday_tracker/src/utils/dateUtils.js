/**
 * Utility functions for date formatting and manipulation
 */

// PUBLIC_INTERFACE
/**
 * Format a date object into a human-readable string
 * @param {Date} date - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(date).toLocaleDateString(undefined, defaultOptions);
};

// PUBLIC_INTERFACE
/**
 * Get start and end of a specific day
 * @param {Date|string} date - The date to get bounds for
 * @returns {Object} Object with start and end Date objects
 */
export const getDayBounds = (date) => {
  const targetDate = new Date(date);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();
  
  const startOfDay = new Date(year, month, day, 0, 0, 0, 0);
  const endOfDay = new Date(year, month, day, 23, 59, 59, 999);
  
  return {
    start: startOfDay,
    end: endOfDay
  };
};

// PUBLIC_INTERFACE
/**
 * Check if two dates are the same day
 * @param {Date|string} date1 - First date to compare
 * @param {Date|string} date2 - Second date to compare
 * @returns {boolean} True if dates are the same day
 */
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

// PUBLIC_INTERFACE
/**
 * Get the relative day name (Today, Yesterday, etc.) or formatted date
 * @param {Date|string} date - The date to get the name for
 * @returns {string} Relative name or formatted date
 */
export const getRelativeDay = (date) => {
  const today = new Date();
  const targetDate = new Date(date);
  
  if (isSameDay(today, targetDate)) {
    return 'Today';
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameDay(yesterday, targetDate)) {
    return 'Yesterday';
  }
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (isSameDay(tomorrow, targetDate)) {
    return 'Tomorrow';
  }
  
  // Return formatted date if not a special day
  return formatDate(targetDate, { weekday: 'long', month: 'short', day: 'numeric' });
};

// PUBLIC_INTERFACE
/**
 * Group array items by date
 * @param {Array} items - Array of objects with date property
 * @param {string} dateField - Name of the date field in each object
 * @returns {Object} Object with dates as keys and arrays of items as values
 */
export const groupByDate = (items, dateField = 'date') => {
  return items.reduce((groups, item) => {
    const date = item[dateField].split('T')[0]; // Extract date part only
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
};
