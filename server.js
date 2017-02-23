'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, './index.html');

// define routes and socket
const server = express();
server.use('/', express.static(path.join(__dirname, '/public')));
server.get('/', function(req, res) { res.sendFile(INDEX); });
let requestHandler = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(requestHandler);

io.on('connection', function (socket) {
  console.log('Connection received');

  socket.on('broadcast', function (data) {
    socket.broadcast.emit('broadcast', data);
  });
});
