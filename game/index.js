import Controller from "./Controller/index.js";
import Model from "./Model/index.js";

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
    });
    //creates new view
    this.view = new View(
        this.model,
        {
            elementId:settings.elementId,
        }
    );

    this.controller = new Controller(this.model);

    this.timer = null;

    this.start=function() {
        this.view.setVisible();
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
/**
 * Snake
 */
const had=function(barva, x, y, length) {
    this.barva = barva;
    this.body={x:[],y:[]};
    this.body.x.push(x);
    this.body.y.push(y);
    this.length=length;
console.log(this.body.x);
    console.log(this.body.x.length);
    this.getLength = function() {
        return this.length;
    };

    this.move = function(x, y) {
        this.body.x.push(x);
        this.body.y.push(y);
      //  odeber posledni
        if(this.length-1>this.body.x.length &&
            this.length-1>this.body.y.length) {
            this.body.x.shift();
            this.body.y.shift();
        }
    };

    this.add = function(x, y) {
        this.body.x.push(x);
        this.body.y.push(y);
    };

    this.headX = function() {
        return this.body.x[this.length-1];
    };
    this.headY = function() {
        return this.body.y[this.length-1];
    };
    this.getX = function(i) {
        return this.body.x[i];
    };
    this.getY = function(i) {
        return this.body.y[i];
    };
    this.tailX = function() {
        return this.body.x[0];
    };
    this.tailY = function() {
        return this.body.y[0];
    };
    this.is = function(x, y) {
        if (this.head.x === x && this.head.y === y) {
            return true;
        } else {
            return false;
        }
    };
}

/**
 * View
 */
const View=function(model, settings) {
    this.model=model;
    //this.model=this.controller.getModel();
    //  this.maxX=    this.model.getMaxX();
    // this.maxY=    this.model.getMaxY();

    this.setVisible = function() {
        console.log(this.model)
    };


    this.getModel = function() {
return   this.model  };

    this.update = function() {
        this.repaint(this.model);
    };

    this.start = function() {
        this.controller.setEventListener();
        this.repaint();
        let model=this.model;
        let self=this;
        this.timer=setInterval(function() {
            model.step();
            self.update();
        }, 250);
    };

    this.repaint = function(model) {
        this.drawMap(model.currentMap);
        let element = document.getElementById('score');
        element.innerHTML = model.getScore();
    };

    this.drawMap = function(map) {
        let element = document.getElementById(settings.elementId);
        element.innerHTML = '';
        var table = document.createElement('table'),
            tr, td, row, cell;
        for (let i = 0; i < map.height; i++) {
            tr = document.createElement('tr');
            for (let p = 0; p < map.width; p++) {
                td = document.createElement('td');
                tr.appendChild(td);
                td.innerHTML = '';
                td.className = map.Map[i][p];
            }
            table.appendChild(tr);
        }
        element.appendChild(table);
        element.innerHTML += map.cnt;
    };
};

let Settings={
    fps: 10,
    size: 4,
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