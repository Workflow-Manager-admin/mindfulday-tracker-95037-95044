import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './components/components.css';
import { AppProvider } from './context/AppContext';

// Import components
import { Layout, Dashboard, TaskTracker, Reflection } from './components';

// Home page component
const Home = () => (
  <div className="container">
    <div className="hero">
      <div className="subtitle">Daily Mindfulness and Planning</div>
      <h1 className="title">MindfulDay Tracker</h1>
      <div className="description">
        Track your daily tasks, mood, and reflections with focus on mindfulness and self-awareness.
      </div>
      <Link to="/dashboard">
        <button className="btn btn-large">Start Your Day</button>
      </Link>
    </div>
  </div>
);

// Tasks page component using TaskTracker
const TasksPage = () => (
  <div className="container">
    <h1>Task Tracker</h1>
    <p className="description">
      Manage your daily tasks and track your progress throughout the day.
    </p>
    <TaskTracker />
  </div>
);

// Journal page component using Reflection component
const JournalPage = () => (
  <div className="container">
    <h1>Daily Journal</h1>
    <p className="description">
      Record your mood and reflections to build mindfulness habits.
    </p>
    <Reflection />
  </div>
);

// Profile placeholder page
const ProfilePage = () => (
  <div className="container">
    <h1>Profile & Settings</h1>
    <p className="description">
      Manage your personal settings and preferences.
    </p>
    <div className="settings-container">
      <p>This feature is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/tasks" element={<Layout><TasksPage /></Layout>} />
            <Route path="/journal" element={<Layout><JournalPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;