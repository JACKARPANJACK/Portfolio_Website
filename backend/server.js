const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

// Serve the admin page at the root route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // For development. Update to your frontend URL in production.
    methods: ['GET', 'POST']
  }
});

// Setup MongoDB Database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://aparamanik132_db_user:db_password@cluster0.dbiuklr.mongodb.net/?appName=Cluster0";
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Message Schema
const messageSchema = new mongoose.Schema({
  sessionId: String,
  senderRole: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

io.on('connection', (socket) => {
  // Visitor joins their private room
  socket.on('joinVisitor', async (sessionId) => {
    socket.join(sessionId);
    try {
      const rows = await Message.find({ sessionId }).sort({ timestamp: 1 });
      socket.emit('messageHistory', rows);
    } catch (err) {
      console.error(err);
    }
  });

  // Admin joins the admin room
  socket.on('joinAdmin', async (adminSecret) => {
    if (adminSecret === process.env.ADMIN_SECRET) { // Use environment variable for admin secret
      socket.join('admin_room');
      try {
        const rows = await Message.find().sort({ timestamp: 1 });
        socket.emit('adminMessageHistory', rows);
      } catch (err) {
        console.error(err);
      }
    }
  });

  // Handle incoming messages
  socket.on('sendMessage', async (data) => {
    const { sessionId, senderRole, text } = data;
    
    try {
      const newMessage = new Message({ sessionId, senderRole, text });
      await newMessage.save();
      
      // Send to visitor
      io.to(sessionId).emit('receiveMessage', newMessage);
      // Send to admin
      io.to('admin_room').emit('receiveAdminMessage', newMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});
