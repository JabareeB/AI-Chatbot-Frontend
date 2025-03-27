import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import msuLogo from '../assets/msu_logo.png';

const AIChatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInput.trim()) return;

        setLoading(true);
        setResponse('');

        try {
            const result = await axios.post('http://localhost:8080/api/ask', { question: userInput }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setResponse(result.data);
        } catch (error) {
            console.error("Error:", error);
            setResponse("Error occurred while communicating with the backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#1e1e1e',
                padding: '20px'
            }}
        >
            <motion.div 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                transition={{ duration: 0.5 }}
                style={{
                    display: 'flex',
                    width: '90%',
                    maxWidth: '1200px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '15px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden'
                }}
            >
                {/* MSU Logo Section */}
                <div style={{
                    backgroundColor: '#0056a1',
                    padding: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '1'
                }}>
                    <img src={msuLogo} alt="Morgan State University Logo" style={{ width: '80%', height: 'auto' }} />
                </div>

                {/* Chatbot Section */}
                <div style={{ padding: '40px', flex: '2' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>AI Chatbot</h1>
                    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask me anything..."
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '1px solid #333',
                                backgroundColor: '#333',
                                color: 'white',
                                marginBottom: '15px',
                                fontSize: '1rem'
                            }}
                        />
                        <button type="submit" style={{
                            padding: '12px 25px',
                            borderRadius: '8px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            fontSize: '1rem',
                            transition: 'background-color 0.3s'
                        }}>
                            {loading ? 'Loading...' : 'Send'}
                        </button>
                    </form>
                    {loading && (
                        <div style={{
                            backgroundColor: '#007bff',
                            height: '5px',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            animation: 'load 1s infinite'
                        }}></div>
                    )}
                    {response && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.5 }}
                            style={{
                                backgroundColor: 'white',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '1rem'
                            }}
                        >
                            <strong>Response:</strong> {response}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AIChatbot;
