import React from 'react';
import { Link } from 'react-router-dom';

const CurriculumPage = () => (
  <div style={{ backgroundColor: '#07086a', minHeight: '100vh', color: 'white', padding: '30px' }}>
    <Link to="/" style={{ color: '#FFA500', textDecoration: 'none' }}>← Back to Chat</Link>
    <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Degrees & Programs Offered</h1>

    <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e1e1e', borderRadius: '10px', padding: '20px' }}>
      <h2>Bachelor’s Programs</h2>
      <ul>
        <li>
          <strong>B.S. in Computer Science</strong><br />
          Offers a comprehensive curriculum covering core CS areas such as software engineering, cybersecurity, operating systems, and algorithms.
          <br />
          <em>Ask Code Orange Code Blue for more details on requirements and planning.</em>
        </li>
        <li>
          <strong>B.S. in Cloud Computing</strong><br />
          Focuses on cloud technologies, networks, security, and application development. Prepares students for careers in cloud-based systems.
          <br />
          <em>Ask Code Orange Code Blue about courses or tracks in this program.</em>
        </li>
      </ul>

      <h2>Master’s Programs</h2>
      <ul>
        <li>
          <strong>M.S. in Advanced Computing</strong><br />
          Ideal for students or professionals aiming to deepen their knowledge in AI, cybersecurity, cloud computing, and data science. Flexible online and in-person options available.
        </li>
        <li>
          <strong>M.S. in Bioinformatics</strong><br />
          An interdisciplinary program blending biology and computer science for roles in biotech, genomics, and pharmaceutical sectors.
        </li>
      </ul>

      <h2>Ph.D. Program</h2>
      <ul>
        <li>
          <strong>Ph.D. in Advanced Computing</strong><br />
          Offers research in quantum cryptography, AI/ML ethics, and cutting-edge computing topics. Available in onsite and online formats.
        </li>
      </ul>

      <h2>Accelerated Option</h2>
      <ul>
        <li>
          <strong>4+1 B.S. + M.S. Program in Computer Science</strong><br />
          Allows students to earn both degrees in just five years—ideal for students seeking advanced roles or graduate research early.
        </li>
      </ul>

      <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
        For course sequences, admission requirements, and further guidance, ask Code Orange Code Blue or visit the official <a href="https://www.morgan.edu/scmns/computerscience" target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>Computer Science Department website</a>.
      </p>
    </div>
  </div>
);

export default CurriculumPage;
