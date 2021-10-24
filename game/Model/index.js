
/**
 * Map
 */
let map=function(height, width, colourCnt) {
    this.height = height;
    this.width = width;
    this.Map = [];

    this.cnt = 0;
    for (let i = 0; i < this.height; i++) {
        this.Map[i] = [];
        for (let p = 0; p < this.width; p++) {
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

    this.setIndexColour = function(x,y,colour) {
        this.Map[x][y] = colour;
    };
    this.getIndexColour = function(x,y) {
        return this.Map[x][y];
    };
}

/**
 * Model
 */
export default function Model() {

    this.tick=0;
    this.score=0;
    this.maps = [];
    this.maps.push(new map(10, 10));
    this.mapNumber=0;
    this.Snakes = [];
    this.currentMap = new map(10, 10);
    this.cntSnakes = 3;

    this.totalScore = 0;

    this.nextMap = function() {
        return this.telo.y;
    };

    this.previousMap = function() {
        return this.telo.y;
    };
    this.moveRight= function() {
        console.log("moveRight");
    };
    this.moveLeft= function() {
        console.log("moveLeft");
    };
    this.moveUp= function() {
        console.log("moveUp");
        this.score++;
    };
    this.moveDown= function() {
        console.log("moveDown");
        this.score--;
    };

    this.moveSnakes = function() {
        for (i = 0; i < this.cntSnakes; i++) {
            x=this.Snakes[i].headX();
            y=this.Snakes[i].headY();
            lx=this.Snakes[i].tailX();
            ly=this.Snakes[i].tailY();

            this.currentMap.setIndexColour(lx,ly,"white")

            if( this.currentMap.getIndexColour(x+1,y+1)=="blue"){
                this.Snakes[i].move(x+1,y+1);
            }else if(this.currentMap.getIndexColour(x+1,y)=="white"){
                this.Snakes[i].move(x+1,y);
            }else if(this.currentMap.getIndexColour(x+1,y+1)=="white"){
                this.Snakes[i].move(x+1,y+1);
            }else if(this.currentMap.getIndexColour(x,y+1)=="white"){
                this.Snakes[i].move(x,y+1);
            }else if(x>0){
                if(this.currentMap.getIndexColour(x-1,y)=="white" ){
                    this.Snakes[i].move(x-1,y);
                }else if(this.currentMap.getIndexColour(x-1,y+1)=="white" ){
                    this.Snakes[i].move(x-1,y+1);
                }  }
            else if(y>0){
                if(this.currentMap.getIndexColour(x,y-1)=="white"  ){
                    this.Snakes[i].move(x,y-1);
                }else if(this.currentMap.getIndexColour(x+1,y-1)=="white"  ){
                    this.Snakes[i].move(x+1,y-1);
                }}
            else if(y>0 && x>0){
                if(this.currentMap.getIndexColour(x-1,y-1)=="white" ){
                    this.Snakes[i].move(x-1,y-1);
                }
            }
            for(let b=0;b<this.Snakes[i].getLength;b++){
                x=this.Snakes[i].getX(b);
                y=this.Snakes[i].getY(b);
                this.currentMap.setIndexColour(x,y,this.Snakes[i].barva)
            }
        }
    };


    this.update = function() {
        console.log("model updated");
        this.tick++;
    };

    this.step = function() {
        let self=this;
        console.log("Step "+self.cnt);
        self.cnt++;
        this.moveSnakes();
    };

    this.initStep = function() {
        this.currentMap=this.maps[this.mapNumber];

        this.Snakes[0] = new had("red", 0, 0,1);
        this.Snakes[1] = new had("blue", 0, 3,1);
        this.Snakes[2] = new had("green", 1, 5,1);
    };

    this.getScore = function() {
        return this.score
    };

    this.setScore = function(score) {
        this.score=score;
    };

    this.getInfo = function() {
    };
};
