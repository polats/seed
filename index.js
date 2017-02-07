var
  port            = process.env.PORT || 3000,

  io              = require('socket.io'),
  express         = require('express'),
  path            = require('path'),  
  http            = require('http'),
  app             = express(),
  server          = http.createServer(app);

app.use(express.static(path.join(__dirname, '/public')));

server.listen(port);
var io = io.listen(server);

console.log('Server started on port', port);

//By default, we forward the / path to index.html automatically.
app.get( '/', function( req, res ){
console.log('trying to load %s', __dirname + '/index.html');
res.sendfile( '/index.html' , { root:__dirname });
});

io.on('connection', function (socket) {
  console.log('Connection received');

  socket.on('broadcast', function (data) {
    socket.broadcast.emit('broadcast', data);
  });
});
