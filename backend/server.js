const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

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

// Setup SQLite Database
const db = new sqlite3.Database('./chat.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite DB:', err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS messages_v2 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sessionId TEXT,
      senderRole TEXT,
      text TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

io.on('connection', (socket) => {
  // Visitor joins their private room
  socket.on('joinVisitor', (sessionId) => {
    socket.join(sessionId);
    db.all('SELECT * FROM messages_v2 WHERE sessionId = ? ORDER BY timestamp ASC', [sessionId], (err, rows) => {
      if (!err) socket.emit('messageHistory', rows);
    });
  });

  // Admin joins the admin room
  socket.on('joinAdmin', (adminSecret) => {
    if (adminSecret === 'ILoveCoding123') { // Simple hardcoded secret for now
      socket.join('admin_room');
      db.all('SELECT * FROM messages_v2 ORDER BY timestamp ASC', [], (err, rows) => {
        if (!err) socket.emit('adminMessageHistory', rows);
      });
    }
  });

  // Handle incoming messages
  socket.on('sendMessage', (data) => {
    const { sessionId, senderRole, text } = data;
    
    const stmt = db.prepare('INSERT INTO messages_v2 (sessionId, senderRole, text) VALUES (?, ?, ?)');
    stmt.run([sessionId, senderRole, text], function (err) {
      if (!err) {
        const newMessage = {
          id: this.lastID,
          sessionId,
          senderRole,
          text,
          timestamp: new Date().toISOString()
        };
        
        // Send to visitor
        io.to(sessionId).emit('receiveMessage', newMessage);
        // Send to admin
        io.to('admin_room').emit('receiveAdminMessage', newMessage);
      }
    });
    stmt.finalize();
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});
