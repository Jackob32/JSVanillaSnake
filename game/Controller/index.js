
Keyboard.Keymap = {
    "ArrowLeft": 'left',
    "ArrowUp": 'up',
    "ArrowRight": 'right',
    "ArrowDown": 'down'
};

/**
 * Controller
 */
export default function Controller(model) {
    this.model=model;
    // Setts
    var self      = this;
    this.pressKey = null;
    this.keymap   = Keyboard.Keymap;
    // Get Key
    this.getKey = function() {
        return this.keymap[this.pressKey];
    };
    this.getModel= function() {
        return this.model;
    };
    this.setEventListener = function() {
        document.addEventListener('keydown', this.onKeyDown);
    };

    this.update = function(model) {
        return self.model;
    };

    this.getModel = function() {
        return   this.model  };

    // Keydown Event
    this.onKeyDown = function(event) {
        if (event.defaultPrevented) {
            return; // Should do nothing if the default action has been cancelled
        }
        var handled = true;
        self.pressKey = event.code;

        // Add position by stage direction
        switch (self.getKey()) {
            case 'right':
                self.model.moveRight();
                break;
            case 'left':
                self.model.moveLeft();
                break;
            case 'up':
                self.model.moveUp();
                break;
            case 'down':
                self.model.moveDown();
                break;
            default:
                console.log(self.pressKey );
        }

        if (handled) {
            // Suppress "double action" if event handled
            event.preventDefault();
        }
    };
};
