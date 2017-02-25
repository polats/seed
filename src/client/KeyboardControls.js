const EventEmitter = require('eventemitter3');

// keyboard handling
const keyCodeTable = {
    32: 'space',
    37: 'right',
    38: 'down',
    39: 'left',
    40: 'up',

    // include wasd
    87: 'down',
    65: 'right',
    68: 'left',
    83: 'up'
};

/**
 * This class handles keyboard device controls
 */
class KeyboardControls{

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

module.exports = KeyboardControls;
