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
        <li>COSC 349 - Computer Networks</li>
        <li>COSC 351 - Cybersecurity</li>
        <li>COSC 352 - Organization of Programming Languages</li>
        <li>COSC 354 - Operating Systems</li>
        <li>COSC 458 - Software Engineering</li>
        <li>COSC 459 - Database Design</li>
        <li>COSC 490 - Senior Project</li>
      </ul>
      <h2>Supporting Computer Science Courses:</h2>
      <ul>
        <li>MATH 241 - Calculus I</li>
        <li>MATH 242 - Calculus II</li>
        <li>MATH 312 - Linear Algebra I</li>
        <li>MATH 331 - Applied Probability & Statistics</li>
        <li>COSC 201 - Computer Ethics</li>
      </ul>
      <h2>Electives:</h2>
      <p>Group A, B, C, D electives available for customization. See advisor for details.</p>
    </div>
  </div>
);

export default CurriculumPage;