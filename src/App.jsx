/* import React from 'react';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div 
      style={{
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f8f9fa' 
      }}
    >
      <LoginForm />
    </div>
  );
}

export default App; */

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TayinTalebiPage from './pages/TayinTalebiPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f8f9fa'
            }}
          >
            <LoginForm />
          </div>
        } />
        <Route path="/tayin-talebi" element={<TayinTalebiPage />} />
      </Routes>
    </Router>
  );
}

export default App;