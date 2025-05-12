import React, { useState } from 'react';
import "../css/Chatbox.css";

const MainChatBox = () => {
    const [question, setQuestion] = useState('');
    const [level, setLevel] = useState('beginner');
    const [chat, setChat] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const userMessage = { sender: 'user', text: question };
        setChat(prev => [...prev, userMessage]);

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/ask?question=${encodeURIComponent(question)}&level=${level}`);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();

            const botMessage = {
                sender: 'bot',
                text: data.answer || "No answer available.",
                links: {
                    sources: data.wikipedia_link ? [data.wikipedia_link] : [],
                    youtube: data.videos ? [data.videos] : [],
                    pdf: data.pdf_download_link || null
                }
            };

            setChat(prev => [...prev, botMessage]);
            setQuestion('');
            setError('');
        } catch (err) {
            console.error("❌ Fetch error:", err);
            setError(`⚠️ Failed to fetch data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <nav className="navbar">ASK API</nav>

            <div className="chat-container">
                <div className="chat-box">
                    {chat.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            {msg.sender === 'user' ? (
                                <div>
                                    <small className="label user-label">You</small>
                                    <p>{msg.text}</p>
                                </div>
                            ) : (
                                <div>
                                    <small className="label bot-label">Bot</small>
                                    <details className="dropdown">
                                        <summary>Answer</summary>
                                        <p>{msg.text}</p>
                                    </details>

                                    {msg.links?.sources?.length > 0 && (
                                        <details className="dropdown">
                                            <summary>Source URLs</summary>
                                            {msg.links.sources.map((url, i) => (
                                                <a key={i} href={url} target="_blank" rel="noreferrer">{url}</a>
                                            ))}
                                        </details>
                                    )}

                                    {msg.links?.youtube?.length > 0 && (
                                        <details className="dropdown">
                                            <summary>YouTube Links</summary>
                                            {msg.links.youtube.map((yt, i) => (
                                                <a key={i} href={yt} target="_blank" rel="noreferrer">{yt}</a>
                                            ))}
                                        </details>
                                    )}

                                    {msg.links?.pdf && (
                                        <details className="dropdown">
                                            <summary>Download PDF</summary>
                                            <a href={msg.links.pdf} target="_blank" rel="noreferrer">Download Summary PDF</a>
                                        </details>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <form className="chat-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ask me something..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={loading}
                    />
                    <select value={level} onChange={(e) => setLevel(e.target.value)} disabled={loading}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <button type="submit" disabled={loading}>Send</button>
                </form>

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default MainChatBox;
