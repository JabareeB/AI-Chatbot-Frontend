import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import msuLogo from '../assets/msu_logo.png';

const AIChatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    const handleVoiceInput = () => {
    if (!recognition) {
        alert("Speech Recognition is not supported in this browser.");
        return;
     }

     recognition.continuous = false;
     recognition.interimResults = false;
     recognition.lang = 'en-US';
 
     recognition.start();

     recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setUserInput(spokenText);
     };

     recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
     };
    };
     

    const handleDocUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Uploaded file:", file);
            // Handle upload logic here
        }
    };
    

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
                    backgroundColor: '#07086a',
                    borderRadius: '15px',
                    boxShadow: '0 0 10px rgba(226, 23, 23, 0.1)',
                    overflow: 'hidden'
                }}
            >
                {/* MSU Logo Section */}
                <div style={{
                    backgroundColor: 'transparent',
                    padding: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '1'
                }}>
                    <img src={msuLogo} alt="Morgan State University Logo" style={{ width: '80%', height: 'auto' }} />
                </div>

                {/* Chatbot Section */}
                <div style={{ padding: '40px', flex: '2', display:'flex', flexDirection:'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>
                        <h1 className= "bungee-spice-regular" style={{ textAlign: 'center', marginBottom: '20px' }}>Code Orange Code Blue</h1>
                        {response && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.5 }}
                            style={{
                                backgroundColor: 'Navy-Blue',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                marginBottom: '20px'
                            }}
                        >
                            <strong>Response:</strong> {response}
                        </motion.div>
                    )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                        <input
                        type ="text"
                        value={userInput}
                        onChange={(e)=> setUserInput(e.target.value)}
                        placeholder='Ask me anything...'
                        style={{
                            width: '100%',
                            padding: '15px 50px 15px 15px',
                            borderRadius: '8px',
                            border: '1px solid #333',
                            backgroundColor: '#333',
                            color: 'white',
                            marginBottom: '15px',
                            fontSize: '1rem'
                        }}
                        
                    /> 
                    
                    <button type='button' onClick={handleVoiceInput} style={{
                        position: 'bottom',
                        right: '10px',
                        top: '10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '1.3rem'
                    }}
                    title="click  to speak"
                    >
                    🎤
                    </button> 
                    </div> 
                    <label
                     htmlFor="doc-upload"
                     style={{
                     position: 'bottom',
                     right: '10px',
                     top: '10px',
                     backgroundColor: 'transparent',
                     border: 'none',
                     cursor: 'pointer',
                     color: 'white',
                     fontSize: '1.3rem'
                    }}
                    title="Upload a document"
                    >
                   📄 
                   <input
                   id="doc-upload"
                   type="file"
                   accept=".pdf,.doc,.docx,.txt"
                   onChange={handleDocUpload}
                   style={{ display: 'none' }}
                   />
               </label>
               
                    <button type='submit' style={{
                        padding: '12px 25px',
                        borderRadius: '8px',
                        backgroundColor: '#ff3300',
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
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AIChatbot;
