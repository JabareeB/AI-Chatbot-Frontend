import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const handleIngest = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/ingest');
      alert(response.data.message);
    } catch (error) {
      alert('Failed to ingest data. Please check backend logs.');
    }
  };

  const handleClearIndex = async () => {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/clear-index');
      alert(response.data.message);
    } catch (error) {
      alert('Failed to clear index. Please check backend logs.');
    }
  };

  return (
    <div style={{ padding: '40px', color: '#07086a' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#FFA500', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>← Back to Chat</Link>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This page will contain admin functionalities like uploading new documents, managing FAQ entries, etc.</p>

      <div style={{ marginTop: '30px' }}>
        <button onClick={handleIngest} style={{ marginRight: '20px', padding: '12px 20px', backgroundColor: '#FFA500', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          📥 Re-ingest Data
        </button>
        <button onClick={handleClearIndex} style={{ padding: '12px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          🧹 Clear Index
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
