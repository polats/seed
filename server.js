var WebSocketServer = require('uws').Server;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer();
var gameport = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

var wss = new WebSocketServer({server: server});
wss.on('connection', function (ws) {
  var id = setInterval(function () {
    ws.send(JSON.stringify(process.memoryUsage()), function () { /* ignore errors */ });
  }, 100);
  console.log('started client interval');
  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

server.on('request', app);
server.listen(gameport, function () {
  console.log('Listening on http://localhost:' + gameport);
});
