const app = require('express')();
const express = require('express');
const Chat = require('./database/models/chat');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});
require('./database/mongoose-connection');
app.use(express.json());
app.use('/', require('./api/route'));
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', async (message) => {
    console.log(socket.id);
    let saveMessage = await Chat.create({ message : message.message, receiverId: message.receiverId, senderId: message.senderId });
    io.emit('message', saveMessage);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));