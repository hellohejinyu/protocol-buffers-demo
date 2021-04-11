const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8800",
    methods: ["GET", "POST"]
  }
});
const bodyProto = require('./proto-helper').bodyProto
const defineProto = require('./proto-helper').defineProto

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('msg', (msg) => {
    const res = bodyProto.MatchStock.deserializeBinary(msg)
    console.log(typeof res)
    console.log(res)
    io.emit('send', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});