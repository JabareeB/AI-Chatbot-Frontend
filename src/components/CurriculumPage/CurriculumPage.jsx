import React from 'react';
import { Link } from 'react-router-dom';

const CurriculumPage = () => (
  <div style={{ backgroundColor: '#07086a', minHeight: '100vh', color: 'white', padding: '30px' }}>
    <Link to="/" style={{ color: '#FFA500', textDecoration: 'none' }}>← Back to Chat</Link>
    <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Computer Science Curriculum</h1>
    <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e1e1e', borderRadius: '10px', padding: '20px' }}>
      <h2>Core Courses:</h2>
      <ul>
        <li>COSC 111 - Introduction to Computer Science I</li>
        <li>COSC 112 - Introduction to Computer Science II</li>
        <li>COSC 220 - Data Structures & Algorithms</li>
        <li>COSC 241 - Computer Systems & Digital Logic</li>
        <li>COSC 281 - Discrete Structures</li>
        <li>COSC 351 - Cybersecurity</li>
        <li>COSC 352 - Organization of Programming Languages</li>
        <li>COSC 354 - Operating Systems</li>
        <li>COSC 458 - Software Engineering</li>
        <li>COSC 490 - Senior Project</li>
      </ul>
    </div>
  </div>
);

export default CurriculumPage;
