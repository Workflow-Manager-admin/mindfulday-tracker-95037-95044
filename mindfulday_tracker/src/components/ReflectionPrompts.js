import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './shared/Card';
import Button from './shared/Button';

// Array of reflection prompts for users
const prompts = [
  {
    category: 'Gratitude',
    questions: [
      "What are three things you're grateful for today?",
      "Who made a positive impact on your day, and why?",
      "What simple pleasure brought you joy today?",
      "What opportunity or challenge are you grateful for?"
    ]
  },
  {
    category: 'Growth',
    questions: [
      "What did you learn today?",
      "How did you grow as a person today?",
      "What mistake taught you something valuable?",
      "What habit or practice helped you most today?"
    ]
  },
  {
    category: 'Mindfulness',
    questions: [
      "What moment today made you feel most present and aware?",
      "How did you practice self-compassion today?",
      "When did you feel most at peace today?",
      "What emotions were most present for you today?"
    ]
  },
  {
    category: 'Intention',
    questions: [
      "What are your intentions for tomorrow?",
      "What's one thing you want to do differently tomorrow?",
      "What are you looking forward to?",
      "How will you practice self-care tomorrow?"
    ]
  }
];

// PUBLIC_INTERFACE
/**
 * Component that provides reflection prompts to inspire user entries
 * @param {Object} props - Component props
 * @param {function} props.onSelectPrompt - Callback when a prompt is selected
 */
const ReflectionPrompts = ({ onSelectPrompt }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handlePromptSelect = (question, category) => {
    if (onSelectPrompt) {
      onSelectPrompt(question, category);
    }
  };

  return (
    <div className="reflection-prompts">
      <h3>Need inspiration?</h3>
      <p className="prompts-intro">
        Select from these prompts to guide your reflection:
      </p>
      
      <div className="prompts-categories">
        {prompts.map(category => (
          <Card 
            key={category.category} 
            className={`prompt-category ${expandedCategory === category.category ? 'expanded' : ''}`}
          >
            <div 
              className="prompt-category-header"
              onClick={() => handleCategoryClick(category.category)}
            >
              <h4>{category.category}</h4>
              <span className="expand-icon">
                {expandedCategory === category.category ? '−' : '+'}
              </span>
            </div>
            
            {expandedCategory === category.category && (
              <div className="prompt-questions">
                {category.questions.map((question, idx) => (
                  <Button 
                    key={idx}
                    variant="text"
                    className="prompt-question"
                    onClick={() => handlePromptSelect(question, category.category.toLowerCase())}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

ReflectionPrompts.propTypes = {
  onSelectPrompt: PropTypes.func
};

export default ReflectionPrompts;
