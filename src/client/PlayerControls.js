const EventEmitter = require('eventemitter3');

// keyboard handling
const keyCodeTable = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',

    // include wasd
    87: 'up',
    65: 'left',
    68: 'right',
    83: 'down'
};

/**
 * This class handles all device controls
 */
class PlayerControls{

    constructor(){
        Object.assign(this, EventEmitter.prototype);

        this.setupListeners();

        // keep a reference for key press state
        this.activeInput = {
            down: false,
            up: false,
            left: false,
            right: false
        };

        this.dashInput = {
          pending: false,
          dashSpeed: 0,
          dashVector: null
        };
    }

    setupListeners(){
        // add special handler for space key
        document.addEventListener('keydown', (e) => {
            if (e.keyCode == '32' && !this.activeInput.space) {
                this.emit('fire');
            }
        });

        document.addEventListener('keydown', (e) => { this.onKeyChange(e, true);});
        document.addEventListener('keyup', (e) => { this.onKeyChange(e, false);});

        document.addEventListener('dash-move', (e) => { this.onDashMove(e, false);});
    }

    onDashMove(e, isDown) {
      this.dashInput.pending = true;
      this.dashInput.dashSpeed = e.detail.dashSpeed;
      this.dashInput.dashVector = e.detail.dashVector;
    }

    onKeyChange(e, isDown) {
        e = e || window.event;

        let keyName = keyCodeTable[e.keyCode];
        if (keyName) {
            this.activeInput[keyName] = isDown;
            // keep reference to the last key pressed to avoid duplicates
            this.lastKeyPressed = isDown ? e.keyCode : null;
            // this.renderer.onKeyChange({ keyName, isDown });
            e.preventDefault();
        }
    }
}

module.exports = PlayerControls;
