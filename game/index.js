import Controller from "./Controller/index.js";
import Model from "./Model/index.js";
import View from "./View/index.js";

/**
 * Keyboard Map
 */
const Keymap = {
    'ArrowLeft': 'left',
    'ArrowUp': 'up',
    'ArrowRight': 'right',
    'ArrowDown': 'down',
    'KeyA': 'left',
    'KeyW': 'up',
    'KeyD': 'right',
    'KeyS': 'down'
};
/**
 * Game
 */
const Game=function(settings) {

    //creates new model
    this.model = new Model({
        difficulty:settings.difficulty,
        size:settings.size,
    });
    //creates new view
    this.view = new View(
        this.model,
        {
            elementId:settings.elementId,
        }
    );
    //creates new Controller

    this.controller = new Controller(this.model);
    this.timer = null;

    this.start=function() {
        this.view.setVisible();
        this.model.init()
        this.controller.setEventListener();
    }

    this.step=function() {
        this.controller.update();
        this.model.update();
        this.view.update();
    }

    this.run=function() {
        this.start()
        this.timer=setInterval(this.step.bind(this),1000/settings.fps);
    }
    this.stop=function() {
        clearInterval(this.timer);
    }
}

let Settings={
    fps: 5,
    size: 20,
    difficulty: 20,
    elementId: 'map',
};

/**
 * Create Game
 */
(function() {
    var game = new Game(Settings);
    game.run();
    //document.getElementById('mapy').innerHTMl="lool";
})();