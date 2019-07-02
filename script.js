
/**
 * Namespace
 */
var Game      = Game      || {};
var Keyboard  = Keyboard  || {};
var Component = Component || {};

/**
 * Keyboard Map
 */
Keyboard.Keymap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

/**
 * Keyboard Events
 */
Keyboard.ControllerEvents = function() {

    // Setts
    var self      = this;
    this.pressKey = null;
    this.keymap   = Keyboard.Keymap;

    // Keydown Event
    document.onkeydown = function(event) {
        self.pressKey = event.which;
    };

    // Get Key
    this.getKey = function() {
        return this.keymap[this.pressKey];
    };
};

/**
 * Game Component Stage
 */
Component.Stage = function(canvas, conf) {

    // Sets
    this.keyEvent  = new Keyboard.ControllerEvents();
    this.width     = canvas.width;
    this.height    = canvas.height;
    this.length    = [];
    this.food      = {};
    this.score     = 0;
    this.direction = 'right';
    this.conf      = {
        cw   : 10,
        size : 5,
        fps  : 1000
    };

    // Merge Conf
    if (typeof conf == 'object') {
        for (var key in conf) {
            if (conf.hasOwnProperty(key)) {
                this.conf[key] = conf[key];
            }
        }
    }

};

/**
 * Game Component Snake
 */
Component.Snake = function(canvas, conf) {

    // Game Stage
    this.stage = new Component.Stage(canvas, conf);

    // Init Snake
    this.initSnake = function() {

        // Itaration in Snake Conf Size
        for (var i = 0; i < this.stage.conf.size; i++) {

            // Add Snake Cells
            this.stage.length.push({x: i, y:0});
        }
    };

    // Call init Snake
    this.initSnake();

    // Init Food
    this.initFood = function() {

        // Add food on stage
        this.stage.food = {
            x: Math.round(Math.random() * (this.stage.width - this.stage.conf.cw) / this.stage.conf.cw),
            y: Math.round(Math.random() * (this.stage.height - this.stage.conf.cw) / this.stage.conf.cw),
        };
    };

    // Init Food
    this.initFood();

    // Restart Stage
    this.restart = function() {
        this.stage.length            = [];
        this.stage.food              = {};
        this.stage.score             = 0;
        this.stage.direction         = 'right';
        this.stage.keyEvent.pressKey = null;
        this.initSnake();
        this.initFood();
    };
};

/**
 * Game Draw
 */
Game.Draw = function(context, snake) {

    // Draw Stage
    this.drawStage = function() {

        // Check Keypress And Set Stage direction
        var keyPress = snake.stage.keyEvent.getKey();
        if (typeof(keyPress) != 'undefined') {
            snake.stage.direction = keyPress;
        }

        // Draw White Stage
        context.fillStyle = "white";
        context.fillRect(0, 0, snake.stage.width, snake.stage.height);

        // Snake Position
        var nx = snake.stage.length[0].x;
        var ny = snake.stage.length[0].y;

        // Add position by stage direction
        switch (snake.stage.direction) {
            case 'right':
                nx++;
                break;
            case 'left':
                nx--;
                break;
            case 'up':
                ny--;
                break;
            case 'down':
                ny++;
                break;
        }

        // Check Collision
        if (this.collision(nx, ny) == true) {
            snake.restart();
            return;
        }

        // Logic of Snake food
        if (nx == snake.stage.food.x && ny == snake.stage.food.y) {
            var tail = {x: nx, y: ny};
            snake.stage.score++;
            snake.initFood();
        } else {
            var tail = snake.stage.length.pop();
            tail.x   = nx;
            tail.y   = ny;
        }
        snake.stage.length.unshift(tail);

        // Draw Snake
        for (var i = 0; i < snake.stage.length.length; i++) {
            var cell = snake.stage.length[i];
            this.drawCell(cell.x, cell.y);
        }

        // Draw Food
        this.drawCell(snake.stage.food.x, snake.stage.food.y);

        // Draw Score
        context.fillText('Score: ' + snake.stage.score, 5, (snake.stage.height - 5));
    };

    // Draw Cell
    this.drawCell = function(x, y) {
        context.fillStyle = 'rgb(170, 170, 170)';
        context.beginPath();
        context.arc((x * snake.stage.conf.cw + 6), (y * snake.stage.conf.cw + 6), 4, 0, 2*Math.PI, false);
        context.fill();
    };

    // Check Collision with walls
    this.collision = function(nx, ny) {
        if (nx == -1 || nx == (snake.stage.width / snake.stage.conf.cw) || ny == -1 || ny == (snake.stage.height / snake.stage.conf.cw)) {
            return true;
        }
        return false;
    }
};


/**
 * Game Snake
 */
Game.Snake = function(elementId, conf) {

    // Sets
    var canvas   = document.getElementById(elementId);
    var context  = canvas.getContext("2d");
    var snake    = new Component.Snake(canvas, conf);
    var gameDraw = new Game.Draw(context, snake);

    // Game Interval
    setInterval(function() {gameDraw.drawStage();}, snake.stage.conf.fps);
};


/**
 * Window Load
 */
window.onload = function() {
    var snake = new Game.Snake('stage', {fps: 100, size: 4});
};

Keyboard.Keymap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

function GameModel() {

    this.maps = [];

    this.currentMap = 0;

    this.totalScore = 0;

    this.nextMap = function() {
        return this.telo.y;
    };

    this.previousMap = function() {
        return this.telo.y;
    };

    this.initStep = function() {

    };

    this.getScore = function() {

    };

    this.getInfo = function() {

    };

}


function GameController() {

    Keyboard.ControllerEvents = function() {

        // Setts
        var self      = this;
        this.pressKey = null;
        this.keymap   = Keyboard.Keymap;

        // Keydown Event
        document.onkeydown = function(event) {
            self.pressKey = event.which;
        };

        // Get Key
        this.getKey = function() {
            return this.keymap[this.pressKey];
        };
    };

    this.maps = [];

    this.currentMap = 0;

    this.totalScore = 0;

    this.nextMap = function() {
        return this.telo.y;
    };

    this.previousMap = function() {
        return this.telo.y;
    };

    this.initStep = function() {

    };

    this.getScore = function() {

    };

    this.getInfo = function() {

    };

}


function had(barva, x, y) {
    this.barva = barva;
    this.telo = {
        x: x,
        y: y
    };
    this.move = function(x, y) {
        this.telo.x = x;
        this.telo.y = y;
    };

    this.lastx = function() {
        return this.telo.x;
    };
    this.firstx = function() {
        return this.telo.x;
    };
    this.lasty = function() {
        return this.telo.y;
    };
    this.firsty = function() {
        return this.telo.y;
    };

    this.is = function(x, y) {
        if (this.telo.x == x && this.telo.y == y) {
            return true;
        } else {
            return false;
        }
    };
}

function mapa(vyska, sirka) {
    this.vyska = vyska;
    this.sirka = sirka;
    this.Map = [];
    this.Snakes = [];
    this.cntSnakes = 3;

    this.Snakes[0] = new had("red", 0, 0);
    this.Snakes[1] = new had("blue", 0, 3);
    this.Snakes[2] = new had("green", 1, 5);

    this.cnt = 0;
    for (i = 0; i < this.vyska; i++) {
        this.Map[i] = [];
        for (p = 0; p < this.sirka; p++) {
            this.Map[i][p] = "white";
        }
    }
    this.Map[0][1] = "black";
    this.Map[1][0] = "black";
    this.Map[0][2] = "black";
    this.Map[1][2] = "black";
    this.Map[2][2] = "black";
    this.Map[4][0] = "black";
    this.Map[5][0] = "black";
    this.Map[5][5] = "black";
    this.Map[4][4] = "black";
    this.Map[3][4] = "black";
    this.Map[2][4] = "black";
    this.Map[4][2] = "black";
    this.Map[5][3] = "black";
    this.Map[4][3] = "black";
    this.Map[3][2] = "black";
    this.Map[3][6] = "red";
    this.Map[9][2] = "black";
    this.Map[7][0] = "green";
    this.Map[3][4] = "blue";

    this.Map[5][0] = "black";
    this.Map[7][5] = "black";
    this.Map[6][4] = "black";
    this.Map[8][4] = "black";
    this.Map[7][4] = "black";
    this.Map[7][2] = "black";
    this.Map[8][3] = "black";
    this.Map[7][3] = "black";

    this.Map[5][5] = "black";
    this.Map[7][9] = "black";
    this.Map[6][6] = "black";
    this.Map[8][8] = "black";
    this.Map[7][7] = "black";
    this.Map[7][6] = "black";
    this.Map[8][5] = "black";
    this.Map[7][9] = "black";
    this.Map[8][1] = "black";
    this.Map[8][2] = "black";
    this.Map[3][5] = "black";
    this.Map[0][9] = "black";
    this.Map[2][6] = "black";
    this.Map[5][8] = "black";
    this.Map[4][7] = "black";
    this.Map[2][6] = "black";
    this.Map[4][5] = "black";
    this.Map[2][9] = "black";

    this.moveSnakes = function() {
        for (i = 0; i < this.cntSnakes; i++) {
            x=this.Snakes[i].firstx();
            y=this.Snakes[i].firsty();
            lx=this.Snakes[i].lastx();
            ly=this.Snakes[i].lasty();

            this.Map[lx][ly]="white";

            if( this.Map[x+1][y+1]=="blue"){
                this.Snakes[i].move(x+1,y+1);
            }else if(this.Map[x+1][y]=="white"){
                this.Snakes[i].move(x+1,y);
            }else if(this.Map[x+1][y+1]=="white"){
                this.Snakes[i].move(x+1,y+1);
            }else if(this.Map[x][y+1]=="white"){
                this.Snakes[i].move(x,y+1);
            }else if(x>0){
                if(this.Map[x-1][y]=="white" ){
                    this.Snakes[i].move(x-1,y);
                }else if(this.Map[x-1][y+1]=="white" ){
                    this.Snakes[i].move(x-1,y+1);
                }  }
            else if(y>0){
                if(this.Map[x][y-1]=="white"  ){
                    this.Snakes[i].move(x,y-1);
                }else if(this.Map[x+1][y-1]=="white"  ){
                    this.Snakes[i].move(x+1,y-1);
                }}

            else if(y>0 && x>0){
                if(this.Map[x-1][y-1]=="white" ){
                    this.Snakes[i].move(x-1,y-1);
                }
            }

            x=this.Snakes[i].firstx();
            y=this.Snakes[i].firsty();

            this.Map[x][y] = this.Snakes[i].barva;

        }
    };

    this.drawMap = function() {
        element = document.getElementById('mapy');
        element.innerHTML = '';
        var table = document.createElement('table'),
            tr, td, row, cell;
        for (i = 0; i < this.vyska; i++) {
            tr = document.createElement('tr');
            for (p = 0; p < this.sirka; p++) {
                td = document.createElement('td');
                tr.appendChild(td);
                td.innerHTML = '';
                td.className = this.Map[i][p];
            }
            table.appendChild(tr);
        }
        element.appendChild(table);
        element.innerHTML += this.cnt;
    };

    this.step = function() {
        this.cnt++;
        this.moveSnakes();
        this.drawMap();

    };
}

(function() {
    var prvni = new mapa(10, 10);
    prvni.drawMap();
    var myVar = setInterval(function() {
        prvni.step();
    }, 250);

    //document.getElementById('mapy').innerHTMl="lool";
})();
