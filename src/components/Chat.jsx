import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { MessageCircle, X, Send } from 'lucide-react';
import './Chat.css';

// Persistent user ID (acting as a session ID for private chat)
const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
};

const SESSION_ID = getOrCreateSessionId();
const socket = io('http://localhost:3001');

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Join as visitor so we only get our own messages
    socket.emit('joinVisitor', SESSION_ID);

    socket.on('messageHistory', (history) => {
      setMessages(history);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('messageHistory');
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    socket.emit('sendMessage', {
      sessionId: SESSION_ID,
      senderRole: 'visitor',
      text: inputText
    });
    setInputText('');
  };

  return (
    <div className="chat-container">
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Contact Me</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`message ${msg.senderRole === 'visitor' ? 'self' : 'other'}`}
              >
                <p>{msg.text}</p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={sendMessage}>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
