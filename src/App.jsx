import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AIChatbot from './components/AIChatbot';
import CurriculumPage from './components/CurriculumPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AIChatbot />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/admin" element={<AdminDashboard  />} />
      </Routes>
    </Router>
  );
}

export default App;