import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AIChatbot from './components/AIChatbot';
import CurriculumPage from './components/CurriculumPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AIChatbot />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
      </Routes>
    </Router>
  );
}

export default App;