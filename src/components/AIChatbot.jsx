import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import msuLogo from '../assets/msu_logo.png';
import { FaMicrophone, FaRegFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const TypingDots = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <div style={{
                backgroundColor: '#000c3f',
                color: 'white',
                borderRadius: '10px',
                padding: '10px 16px',
                marginRight: '10px',
                maxWidth: '80%',
                fontSize: '1rem',
                fontFamily: 'monospace'
            }}>
                Typing<span>...</span>
            </div>
            <div style={{ width: 35, height: 35, backgroundColor: '#FFA500', borderRadius: '50%', textAlign: 'center' }}>🤖</div>
        </div>
    );
};

const AIChatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);
    const [degreeData, setDegreeData] = useState(null);
    const [showAdminPrompt, setShowAdminPrompt] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [redirectToAdmin, setRedirectToAdmin] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const messagesEndRef = useRef(null);
    const messageRefs = useRef([]);
    const navigate = useNavigate();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    const speak = (text) => {
        if (!ttsEnabled || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        if (listening && recognition) recognition.stop();

        const newEntry = { user: userInput, bot: 'loading' };
        const updated = [...history, newEntry];
        setHistory(updated);
        setUserInput('');
        setLoading(true);

        try {
            const result = await axios.post('http://127.0.0.1:8000/chat', { query: userInput });
            const botReply = result.data.response;
            const finalHistory = [...updated];
            finalHistory[finalHistory.length - 1].bot = botReply;
            setHistory(finalHistory);
            localStorage.setItem('chatHistory', JSON.stringify(finalHistory));
            setResponse(botReply);
            speak(botReply);
        } catch (err) {
            const finalHistory = [...updated];
            finalHistory[finalHistory.length - 1].bot = 'Error connecting to backend.';
            setHistory(finalHistory);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setHistory([]);
        localStorage.removeItem('chatHistory');
    }, []);

    const displayedMessages = history.slice(-5);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [displayedMessages]);

    const handleAdminLogin = () => {
        if (adminPassword === 'lab223') {
            setShowAdminPrompt(false);
            setAdminPassword('');
            setRedirectToAdmin(true);
        } else {
            alert('Incorrect password');
        }
    };

    useEffect(() => {
        if (redirectToAdmin) navigate('/admin');
    }, [redirectToAdmin, navigate]);

    return (
        <motion.div style={{ height: '100vh', overflow: 'auto', padding: '20px' }}>
            <motion.div style={{ display: 'flex', width: '90%', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#07086a', borderRadius: '15px', overflow: 'hidden', minHeight: '95vh' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', flexDirection: 'column' }}>
                    <img src={msuLogo} alt="MSU Logo" style={{ width: '80%', maxWidth: '200px' }} />
                    <button onClick={() => setShowAdminPrompt(!showAdminPrompt)} style={{ marginTop: '20px', padding: '10px 15px', backgroundColor: '#FFA500', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                        Admin Login
                    </button>
                    {showAdminPrompt && (
                        <div style={{ marginTop: '10px', color: 'white' }}>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                style={{ padding: '5px', marginRight: '10px', borderRadius: '4px' }}
                            />
                            <button onClick={handleAdminLogin} style={{ padding: '5px 10px', borderRadius: '4px', backgroundColor: '#FFA500', border: 'none' }}>Submit</button>
                        </div>
                    )}
                </div>

                <div style={{ flex: 2, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: "'Bungee Spice', sans-serif" }}>Code Orange Code Blue</h1>

                    <div style={{ flex: 1, overflowY: 'auto', height: '65vh', width: '100%', maxWidth: '350px', paddingRight: '10px', scrollBehavior: 'smooth' }}>
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
                                        <div style={{ backgroundColor: '#000c3f', color: 'white', borderRadius: '10px', padding: 10, marginRight: 10, maxWidth: '80%' }}>
                                            <ReactMarkdown>{entry.bot}</ReactMarkdown>
                                        </div>
                                        <div style={{ width: 35, height: 35, backgroundColor: '#FFA500', borderRadius: '50%', textAlign: 'center' }}>🤖</div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* TTS Toggle */}
                    <div style={{ marginBottom: '15px', width: '100%', maxWidth: '350px' }}>
                        <label style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                checked={ttsEnabled}
                                onChange={() => setTtsEnabled(!ttsEnabled)}
                                style={{ marginRight: '10px' }}
                            />
                            Read responses out loud
                        </label>
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
                    <h2 style={{ textAlign: 'center', marginBottom: 15 }}>Important Links</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ marginBottom: 10 }}><a href="https://www.morgan.edu/scmns/computerscience" target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>CS Department Website</a></li>
                        <li style={{ marginBottom: 10 }}><a href="https://www.morgan.edu/academic-calendar" target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>Academic Calendar</a></li>
                        <li style={{ marginBottom: 10 }}><a href="https://events.morgan.edu/" target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>Morgan Events</a></li>
                        <li style={{ marginBottom: 10 }}><a href="https://map.morgan.edu/" target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>Campus Map</a></li>
                    </ul>

                    <h3>CS Department Contact</h3>
                    <p style={{ fontSize: '0.9rem' }}>
                        1700 E Cold Spring Lane<br />Baltimore, MD 21251<br />McMechen 507 Suite<br />
                        <strong>Phone:</strong> (443) 885-3962<br />
                        <strong>Email:</strong> <a href="mailto:compsci@morgan.edu" style={{ color: '#FFA500' }}>compsci@morgan.edu</a>
                    </p>

                    <h3>Student Organizations</h3>
                    <ul style={{ paddingLeft: 20 }}>
                        <li>
                            <strong><a href="https://www.morganstatewics.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>Women In Computer Science (WiCS)</a></strong><br />
                            <span style={{ fontSize: '0.9rem' }}>@morganstatewics</span>
                        </li>
                        <li style={{ marginTop: '10px' }}>
                            <strong>Google Developer Student Club (GDSC)</strong><br />
                            <span style={{ fontSize: '0.9rem' }}>@gdscmsu</span>
                        </li>
                        <li style={{ marginTop: '10px' }}>
                            <strong><a href="https://www.morgan.edu/computer-science/current-students/sacs" target="_blank" rel="noopener noreferrer" style={{ color: '#FFA500' }}>Society for the Advancement of Computer Science (SACS)</a></strong><br />
                            <span style={{ fontSize: '0.9rem' }}>@sacs_msu</span>
                        </li>
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AIChatbot;




