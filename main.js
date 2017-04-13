'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

// Constants
const PORT = 3000; //process.env.PORT || 3000;
const INDEX = path.join(__dirname, './index.html');

// define routes and socket
const server = express();
server.get('/', (req, res) => { res.sendFile(INDEX); });
server.use('/', express.static(path.join(__dirname, '.')));
const requestHandler = server.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(requestHandler);

// get game classes
const SLServerEngine = require('./src/server/SLServerEngine.js');
const SLGameEngine = require('./src/common/SLGameEngine.js');
const CannonPhysicsEngine = require('incheon').physics.CannonPhysicsEngine;

// create instances
const physicsEngine = new CannonPhysicsEngine();
const gameEngine = new SLGameEngine({ physicsEngine, traceLevel: 0 });
const serverEngine = new SLServerEngine(io, gameEngine, { debug: {}, updateRate: 6 });

// start the game
serverEngine.start();

var fs = require('fs'),
    dotenv = require('dotenv'),
    ProxyControlsServer = require('./server/proxy-controls-server');

dotenv.config({silent: true});

if (process.env.SSL_PORT) {
  new ProxyControlsServer({
    port: process.env.PORT,
    sslPort: process.env.SSL_PORT,
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  });
} else {
  new ProxyControlsServer({
    port: process.env.PORT || process.env.npm_package_config_port
  });
}
