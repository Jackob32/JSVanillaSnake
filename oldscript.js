
var direction=0;

var Game      = Game      || {};
var Keyboard  = Keyboard  || {};
var Component = Component || {};

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
        console.log(event);
        self.pressKey = event.code;
    };

    // Get Key
    this.getKey = function() {
        return this.keymap[this.pressKey];
    };
};

const colors={
    white:"white",
    black:"black",
    pink:"pink",
}

function moveSelection(evt){
    switch (evt.keyCode) {
        case 37:
            direction=3;
            break;
        case 39:
            direction=1;
            break;
        case 38:
            direction=2;
            break;
        case 40:
            direction=0;
            break;
    }
}

window.addEventListener('keydown', moveSelection);


function Snake(barva, x, y) {
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

function Map(height, width) {
    this.height = height;
    this.width = width;
    this.Map = [];
    this.Snakes = [];
    this.cntSnakes = 1;

    this.direction=0;

    this.Snakes[0] = new Snake("red", 0, 0);
    //this.Snakes[1] = new Snake("blue", 0, 3);
    //this.Snakes[2] = new Snake("green", 1, 5);

    this.cnt = 0;
    for (i = 0; i < this.height; i++) {
        this.Map[i] = [];
        for (p = 0; p < this.width; p++) {
            this.Map[i][p] = "white";
        }
    }
    this.Map[0][1] = colors.white;
    this.Map[1][0] = colors.white;
    this.Map[0][2] = colors.black;
    this.Map[1][2] = colors.black;
    this.Map[2][2] = colors.black;
    this.Map[4][0] = colors.black;
    this.Map[5][0] = colors.black;
    this.Map[5][5] = colors.black;
    this.Map[2][4] = colors.white;
    this.Map[4][2] = colors.white;
    this.Map[5][3] = colors.white;
    this.Map[4][3] = colors.white;
    this.Map[3][2] = colors.white;
    this.Map[3][6] = colors.white;
    this.Map[9][2] = colors.white;
    this.Map[7][0] = colors.white;
    this.Map[3][4] = colors.white;

    this.moveSnakes = function() {
        for (i = 0; i < this.cntSnakes; i++) {
            x = this.Snakes[i].firstx();
            y = this.Snakes[i].firsty();
            lx = this.Snakes[i].lastx();
            ly = this.Snakes[i].lasty();

            if(direction===0 && x<this.width && this.Map[x + 1][y] === colors.white)
                this.Snakes[i].move(x + 1, y);
            if(direction===1 && y<this.height && this.Map[x ][y+1] === colors.white)
                this.Snakes[i].move(x, y+1);
            if(direction===2 && x>0 && this.Map[x -1][y] === colors.white)
                this.Snakes[i].move(x-1, y);
            if(direction===3 && y>0 && this.Map[x][y-1] === colors.white)
                this.Snakes[i].move(x, y-1);

            this.Map[lx][ly] = "white";

            x = this.Snakes[i].firstx();
            y = this.Snakes[i].firsty();

            this.Map[x][y] = this.Snakes[i].barva;

        }
    };


    this.moveSelection = function(evt) {
        console.log("jeje");
        switch (evt.keyCode) {
            case 37:
                this.direction=2;
                break;
            case 39:
                this.direction=0;
                break;
            case 38:
                this.direction=3;
                break;
            case 40:
                this.direction=1;
                break;
        }
    };

    this.drawMap = function() {
        element = document.getElementById('map');
        element.innerHTML = '';
        var table = document.createElement('table'),
            tr, td, row, cell;
        for (i = 0; i < this.height; i++) {
            tr = document.createElement('tr');
            for (p = 0; p < this.width; p++) {
                td = document.createElement('td');
                tr.appendChild(td);
                td.innerHTML = '';
                td.className = this.Map[i][p] || "white";
            }
            table.appendChild(tr);
        }
        element.appendChild(table);
        element.innerHTML += this.cnt;
        element.innerHTML += ", ";
        element.innerHTML += direction;
    };

    this.step = function() {
        this.cnt++;
        this.moveSnakes();
        this.drawMap();

    };
}


(function() {
    var firstMap = new Map(40, 40);
    firstMap.drawMap();
    setInterval(function() {
        firstMap.step();
    }, 200);
})();
