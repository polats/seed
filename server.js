var
       WebSocketServer        = require('uws').Server,
       express                = require('express'),
       path                   = require('path'),
       app                    = express(),
       server                 = require('http').createServer(),
       gameport               = process.env.PORT || 3000,
       UUID                   = require('node-uuid'),
       verbose                = false;

app.use(express.static(path.join(__dirname, '/public')));

//This handler will listen for requests on /*, any file from the root of our server.
//See expressjs documentation for more info on routing.

app.get( '/*' , function( req, res, next ) {

    //This is the current file they have requested
var file = req.params[0];

    //For debugging, we can track what files are requested.
if(verbose) console.log('\t :: Express :: file requested : ' + file);

    //Send the requesting client the file.
res.sendfile( __dirname + '/' + file );

}); //app.get *

server.on('request', app);
server.listen(gameport, function () {
  console.log('Listening on http://localhost:' + gameport);

var wss = new WebSocketServer({server: server});

game_server = require('./game.server.js');

//Socket.io will call this function when a client connects,
//So we can send that client looking for a game to play,
//as well as give that client a unique ID to use so we can
//maintain the list if players.
wss.on('connection', function (client) {

        //Generate a new UUID, looks something like
        //5b2ca132-64bd-4513-99da-90e838ca47d1
        //and store this on their socket/connection
    client.userid = UUID();

        //tell the player they connected, giving them their id
    client.emit('onconnected', { id: client.userid } );

        //now we can find them a game to play with someone.
        //if no game exists with someone waiting, they create one and wait.
    game_server.findGame(client);

        //Useful to know when someone connects
    console.log('\t socket.io:: player ' + client.userid + ' connected');

        //Now we want to handle some of the messages that clients will send.
        //They send messages here, and we send them to the game_server to handle.
    client.on('message', function(m) {

        game_server.onMessage(client, m);

    }); //client.on message

        //When this client disconnects, we want to tell the game server
        //about that as well, so it can remove them from the game they are
        //in, and make sure the other player knows that they left and so on.
    client.on('disconnect', function () {

            //Useful to know when soomeone disconnects
        console.log('\t socket.io:: client disconnected ' + client.userid + ' ' + client.game_id);

            //If the client was in a game, set by game_server.findGame,
            //we can tell the game server to update that game state.
        if(client.game && client.game.id) {

            //player leaving a game should destroy that game
            game_server.endGame(client.game.id, client.userid);

        } //client.game_id

    }); //client.on disconnect

    }); //sio.sockets.on connection


/*
wss.on('connection', function (ws) {
  var id = setInterval(function () {
    ws.send(JSON.stringify(process.memoryUsage()),
                           function () {
                           // ignore errors
                           });
  }, 100);
  console.log('started client interval');
  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});
*/

});
