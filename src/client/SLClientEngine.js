const ClientEngine = require('incheon').ClientEngine;
const PlayerControls = require('../client/PlayerControls');
const SLRenderer = require('./SLRenderer');


// The SoccerLeague client-side engine
class SLClientEngine extends ClientEngine {

    // constructor
    constructor(gameEngine, options) {
        super(gameEngine, options, SLRenderer);

        this.serializer.registerClass(require('../common/Car'));
        this.serializer.registerClass(require('../common/Ball'));
        this.serializer.registerClass(require('../common/Arena'));

        this.gameEngine.on('client__preStep', this.preStep, this);
    }

    // start then client engine
    start() {
        this.connected = false;

        super.start();
        if (this.verbose) console.log(`starting client, registering input handlers`);

        if (this.renderer.isReady) {
            this.onRendererReady();
        } else {
            this.renderer.once('ready', this.onRendererReady, this);
        }


    }

    onRendererReady() {
        this.controls = new PlayerControls();

        this.controls.on('fire', () => {
            this.sendInput('space');
        });
    }

    // once joined, add the control components to the player's object
    playerJoined()
    {
      // add controls
      let playerCar = this.gameEngine.world.getPlayerObject(this.playerId);
      if (playerCar != undefined)
      {
/*
<a-sphere color="tomato" depth="1" height="1" width="1" radius="0.25"
dash-move-controls="type:line; raycastCamera: #orbit-camera"
velocity-trail position="0 2 0">
  <a-entity
    id="fps-camera"
    camera="enabled: false;">
  </a-entity>
</a-sphere>
*/
        let cam = document.createElement('a-entity');
        cam.setAttribute('id', 'fps-camera');
        cam.setAttribute('camera', 'active', false);
        playerCar.cameraEl.appendChild(cam);
        playerCar.renderEl.setAttribute('id', 'player');
        playerCar.renderEl.setAttribute('dash-move-controls', 'type:line; raycastCamera: #orbit-camera; maxLength: 200; dashLineLength: 15');
        this.connected = true;
      }
    }

    // our pre-step is to process inputs that are "currently pressed" during the game step
    preStep() {

      // check for playerJoined
        if (!this.connected)
        {
          if (this.playerId)
            {
              this.playerJoined();
            }
        }

        var controls = this.controls;

        if (controls) {
            if (controls.activeInput.up) {
                this.sendInput('up', { movement: true });
            }

            if (controls.activeInput.left) {
                this.sendInput('left', { movement: true });
            }

            if (controls.activeInput.right) {
                this.sendInput('right', { movement: true });
            }

            if (controls.activeInput.down) {
                this.sendInput('down', { movement: true });
            }

            if (controls.dashInput.pending) {
              controls.dashInput.pending = false;
              this.sendInput('dash-move', {dashSpeed: controls.dashInput.dashSpeed, dashVector: controls.dashInput.dashVector});
            }
        }
    }

}


module.exports = SLClientEngine;
