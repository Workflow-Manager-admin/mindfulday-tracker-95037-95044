import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';
import Card from './shared/Card';
import Button from './shared/Button';
import ReflectionDetail from './ReflectionDetail';

// PUBLIC_INTERFACE
/**
 * Component for displaying and filtering reflection history
 */
const ReflectionHistory = () => {
  const { reflections, getFilteredReflections } = useAppContext();
  const [selectedReflectionId, setSelectedReflectionId] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'daily-reflection', 'mood'
  const [searchTerm, setSearchTerm] = useState('');

  // Get all daily reflections (excluding mood-only entries)
  const dailyReflections = useMemo(() => {
    return getFilteredReflections({ 
      type: 'daily-reflection',
      searchTerm: searchTerm || undefined
    });
  }, [getFilteredReflections, searchTerm]);

  // Get filtered reflections based on current filter
  const filteredReflections = useMemo(() => {
    if (filter === 'all') {
      return getFilteredReflections({ 
        searchTerm: searchTerm || undefined
      });
    }
    return getFilteredReflections({ 
      type: filter,
      searchTerm: searchTerm || undefined
    });
  }, [getFilteredReflections, filter, searchTerm]);

  // Group reflections by month for better organization
  const groupedReflections = useMemo(() => {
    const groups = {};
    
    filteredReflections.forEach(reflection => {
      const date = new Date(reflection.date);
      const monthYear = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      
      groups[monthYear].push(reflection);
    });
    
    // Sort each group by date (newest first)
    Object.keys(groups).forEach(month => {
      groups[month].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
    
    return groups;
  }, [filteredReflections]);
  
  // Get the selected reflection
  const selectedReflection = useMemo(() => {
    return filteredReflections.find(r => r.id === selectedReflectionId) || null;
  }, [filteredReflections, selectedReflectionId]);
  
  const handleReflectionClick = (reflectionId) => {
    setSelectedReflectionId(reflectionId);
  };
  
  const handleBackToList = () => {
    setSelectedReflectionId(null);
  };
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSelectedReflectionId(null);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedReflectionId(null);
  };
  
  // If a reflection is selected, show its details
  if (selectedReflectionId) {
    return (
      <ReflectionDetail 
        reflection={selectedReflection} 
        onBack={handleBackToList} 
      />
    );
  }
  
  // Reflection list view
  return (
    <div className="reflection-history">
      <h2>Reflection History</h2>
      
      <div className="reflection-history-controls">
        <div className="filter-buttons">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="small"
            onClick={() => handleFilterChange('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'daily-reflection' ? 'primary' : 'outline'}
            size="small"
            onClick={() => handleFilterChange('daily-reflection')}
          >
            Daily
          </Button>
          <Button 
            variant={filter === 'mood' ? 'primary' : 'outline'}
            size="small"
            onClick={() => handleFilterChange('mood')}
          >
            Mood
          </Button>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search reflections..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>
      
      {Object.keys(groupedReflections).length === 0 ? (
        <div className="no-reflections">
          <p>No reflection entries found</p>
        </div>
      ) : (
        Object.keys(groupedReflections).map(monthYear => (
          <div key={monthYear} className="reflection-month-group">
            <h3 className="month-header">{monthYear}</h3>
            
            <div className="reflection-list">
              {groupedReflections[monthYear].map(reflection => (
                <Card 
                  key={reflection.id} 
                  className="reflection-item"
                  onClick={() => handleReflectionClick(reflection.id)}
                >
                  <div className="reflection-item-header">
                    <span className="reflection-item-date">
                      {formatDate(new Date(reflection.date), { 
                        weekday: 'short', 
                        year: undefined,
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    
                    {reflection.type === 'mood' && (
                      <span className="reflection-item-type mood">
                        Mood
                        <span className="mood-emoji">
                          {reflection.mood === 'great' && '😁'}
                          {reflection.mood === 'good' && '🙂'}
                          {reflection.mood === 'okay' && '😐'}
                          {reflection.mood === 'down' && '🙁'}
                          {reflection.mood === 'stressed' && '😫'}
                        </span>
                      </span>
                    )}
                    
                    {reflection.type === 'daily-reflection' && (
                      <span className="reflection-item-type daily">
                        Reflection
                      </span>
                    )}
                  </div>
                  
                  {reflection.type === 'daily-reflection' && (
                    <div className="reflection-item-preview">
                      {reflection.gratitude && (
                        <p className="preview-text">
                          <strong>Grateful for:</strong> {reflection.gratitude.substring(0, 60)}
                          {reflection.gratitude.length > 60 ? '...' : ''}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <Button 
                    variant="text"
                    size="small"
                    className="view-button"
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReflectionHistory;
