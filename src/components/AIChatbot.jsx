import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import msuLogo from '../assets/msu_logo.png';
import { FaMicrophone, FaRegFileAlt,} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AIChatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);
    const [degreeData, setDegreeData] = useState(null);
    const [scrollIndex, setScrollIndex] = useState(0);
    const messagesEndRef = useRef(null);
    const messageRefs = useRef([]);
    const navigate = useNavigate();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    const handleVoiceInput = () => {
        if (!recognition) return alert("Speech Recognition not supported");
        listening ? recognition.stop() : recognition.start();
        setListening(!listening);

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setUserInput(spokenText);
            setListening(false);
        };
        recognition.onend = () => setListening(false);
        recognition.onerror = () => setListening(false);
    };

    const handleDocUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const text = await file.text();
        const gpaMatch = text.match(/Overall GPA\s*(\d+\.\d+)/i);
        const creditsMatch = text.match(/Credits applied:\s*(\d+)/i);
        const majorMatch = text.match(/Major\s*[:=]?\s*([A-Za-z ]+)/);
        const statusMatch = text.match(/Status\s*[:=]?\s*([A-Za-z ]+)/);

        setDegreeData({
            gpa: gpaMatch?.[1] || 'N/A',
            credits: creditsMatch?.[1] || 'N/A',
            major: majorMatch?.[1] || 'Computer Science',
            status: statusMatch?.[1] || 'Senior'
        });
    };

    const scrollToMessage = (index) => {
        messageRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollUp = () => {
        const newIndex = Math.max(0, scrollIndex - 1);
        setScrollIndex(newIndex);
        scrollToMessage(newIndex);
    };

    const scrollDown = () => {
        const newIndex = Math.min(history.length - 1, scrollIndex + 1);
        setScrollIndex(newIndex);
        scrollToMessage(newIndex);
    };

    const injectBotMessage = (text) => {
        const entry = { user: null, bot: '' };
        const updatedHistory = [...history, entry];
        setHistory(updatedHistory);
    
        let i = 0;
        const typingSpeed = 30;
    
        const typer = setInterval(() => {
            if (i < text.length) {
                // Update the last bot message letter by letter
                updatedHistory[updatedHistory.length - 1].bot += text.charAt(i);
                setHistory([...updatedHistory]);
                i++;
            } else {
                clearInterval(typer);
                // Save only after the full message is typed
                localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
            }
        }, typingSpeed);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        if (listening && recognition) recognition.stop();

        setLoading(true);
        try {
            const result = await axios.post('http://localhost:8080/chat', { query: userInput });
            const botReply = result.data.response;
            const newEntry = { user: userInput, bot: botReply };
            const updated = [...history, newEntry];
            setHistory(updated);
            localStorage.setItem('chatHistory', JSON.stringify(updated));
            setUserInput('');
            setResponse(botReply);
        } catch (err) {
            setResponse("Error connecting to backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    const displayedMessages = history.slice(-5);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [displayedMessages]);

    return (
        <motion.div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px', alignItems: 'center', height: '100vh', padding: '20px' }}>
            <motion.div style={{ display: 'flex', width: '90%', maxWidth: '1200px', backgroundColor: '#07086a', borderRadius: '15px', overflow: 'hidden' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
                    <img src={msuLogo} alt="MSU Logo" onClick={() => injectBotMessage("CODE ORANGE, CODE BLUE, M S U")} style={{ width: '80%', maxWidth: '200px' }} />
                </div>

                <div style={{ flex: 2, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: "'Bungee Spice', sans-serif" }}>Code Orange Code Blue</h1>

                    <div style={{ flex: 1, overflowY: 'auto', maxHeight: '55vh', marginBottom: '20px', width: '100%', maxWidth: '350px' }}>
                        {displayedMessages.map((entry, index) => (
                            <div key={index} ref={el => messageRefs.current[index] = el}>
                                {entry.user && (
                                    <motion.div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <div style={{ width: 35, height: 35, backgroundColor: '#FFA500', borderRadius: '50%', textAlign: 'center' }}>🧑‍🎓</div>
                                        <div style={{ backgroundColor: '#1e1e1e', color: '#FFA500', borderRadius: '10px', marginLeft: 10, padding: 10, maxWidth: '80%' }}>{entry.user}</div>
                                    </motion.div>
                                )}
                                {entry.bot && (
                                    <motion.div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <div style={{ backgroundColor: '#000c3f', color: 'white', borderRadius: '10px', padding: 10, marginRight: 10, maxWidth: '80%' }}>{entry.bot}</div>
                                        <div style={{ width: 35, height: 35, backgroundColor: '#FFA500', borderRadius: '50%', textAlign: 'center' }}>🤖</div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', width: '100%', maxWidth: '350px' }}>
                        <button
                            disabled={!degreeData}
                            onClick={() => injectBotMessage(`Degree Progress:\nGPA: ${degreeData?.gpa}\nCredits: ${degreeData?.credits}\nStatus: ${degreeData?.status}\nMajor: ${degreeData?.major}`)}
                            style={{ width: '48%', padding: '12px 15px', backgroundColor: degreeData ? '#FFA500' : '#555', color: 'black', border: 'none', borderRadius: '8px' }}>
                            🎓 Degree Progress
                        </button>
                        <button
                            onClick={() => navigate('/curriculum')}
                            style={{ width: '48%', padding: '12px 15px', backgroundColor: '#FFA500', color: 'black', border: 'none', borderRadius: '8px' }}>
                            💻 CS Curriculum
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '100%', maxWidth: '350px', display: 'flex', alignItems: 'center', marginBottom: '10px', backgroundColor: '#333', borderRadius: '8px', padding: '0 10px' }}>
                            <input
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask me anything..."
                                style={{ flex: 1, padding: '10px', backgroundColor: 'transparent', color: 'white', border: 'none' }}
                            />
                            <button onClick={handleVoiceInput} type="button" title="Speak" style={{ background: 'none', border: 'none', color: listening ? 'red' : '#FFA500', fontSize: '1.4rem', cursor: 'pointer', outline: 'none' }}>
                                <FaMicrophone />
                            </button>
                            <label htmlFor="doc-upload" style={{ color: '#FFA500', fontSize: '1.4rem', cursor: 'pointer', marginLeft: '10px' }}>
                                <FaRegFileAlt />
                                <input id="doc-upload" type="file" accept=".pdf,.txt" onChange={handleDocUpload} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <button type="submit" style={{ width: '100%', maxWidth: '350px', padding: 12, backgroundColor: '#FFA500', color: 'black', border: 'none', borderRadius: '8px', marginBottom: '10px' }}>
                            Send
                        </button>
                    </form>

                    <button
                        type="button"
                        onClick={() => {
                            setHistory([]);
                            localStorage.removeItem('chatHistory');
                        }}
                        style={{ width: '100%', maxWidth: '350px', padding: 12, backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '8px' }}
                    >
                        Reset Conversation
                    </button>
                </div>

                <div style={{ width: '300px', backgroundColor: '#0e0f40', color: 'white', padding: '20px', overflowY: 'auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 15 }}>History</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {history.map((entry, index) => (
                            <li key={index} style={{ marginBottom: 15, cursor: 'pointer' }} onClick={() => scrollToMessage(index)}>
                                <strong>You:</strong> {entry.user}<br />
                                <strong>Bot:</strong> {entry.bot}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AIChatbot;

