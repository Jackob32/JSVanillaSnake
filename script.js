

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
