import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AppProvider } from './context/AppContext';

// Placeholder components - these will be replaced with actual components later
const Home = () => (
  <div className="container">
    <div className="hero">
      <div className="subtitle">Daily Mindfulness and Planning</div>
      <h1 className="title">MindfulDay Tracker</h1>
      <div className="description">
        Track your daily tasks, mood, and reflections with focus on mindfulness and self-awareness.
      </div>
      <button className="btn btn-large">Start Your Day</button>
    </div>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div className="logo">
                  <span className="logo-symbol">*</span> MindfulDay
                </div>
                <button className="btn">My Journal</button>
              </div>
            </div>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Additional routes will be added here as components are developed */}
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;