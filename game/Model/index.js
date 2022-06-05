import Map from "./Map.js";
import Snake from "./Snake.js";


const randColors=[
    "F44336",
    "E91E63",
    "9C27B0",
    "7E57C2",
    "5C6BC0",
    "42A5F5",
    "29B6F6",
    "26C6DA",
    "26A69A",
    "66BB6A",
    "9CCC65",
    "D4E157",
    "FFEB3B",
    "FFEE58",
    "FFCA28",
    "FF9800",
    "FF5722",
];

const colors={
    white:"white",
    black:"black",
    blue:"blue",
    pink:"pink",
}

const getColor = function() {
    return randColors[Math.floor(Math.random()*(randColors.length-1))];
};

/**
 * Model
 */
export default function Model(settings) {

    this.tick=0;
    this.score=0;
    this.maps = [];
    this.maps.push(new Map(settings.size, settings.size));
    this.mapNumber=0;
    this.Snakes = [];
    this.cntSnakes = 1;
    this.direction=0;
    this.totalScore = 0;
    this.currentMap=this.maps[this.mapNumber];

    this.nextMap = function() {
        return this.body.y;
    };

    this.previousMap = function() {
        return this.body.y;
    };

    this.init = function() {
        this.initSnakes();
    };

    this.getCurrentMap = function() {
        return this.maps[this.mapNumber];
    };

    this.moveRight= function() {
        this.direction=0;
    };

    this.moveLeft= function() {
        this.direction=1;
    };

    this.moveUp= function() {
        this.direction=2;
        this.score++;
    };

    this.moveDown= function() {
        this.direction=3;
        this.score--;
    };

    this.initSnakes = function() {
        this.currentMap=this.getCurrentMap();
        this.cnt = 0;
        for (let i = 0; i < 1; i++) {
            this.Snakes[i] = new Snake(getColor(), i, 0);
            this.Snakes[i].add(i+1,0);
            this.Snakes[i].add(i+2,0);
            this.Snakes[i].add(i+3,0);
        }
    };

    this.moveSnakes = function() {
        for (let i = 0; i < this.cntSnakes; i++) {
            let x = this.Snakes[i].headX();
            let y = this.Snakes[i].headY();

            if(this.direction===0 && x<this.currentMap.width-1){
                if(this.currentMap.getIndexColour(x + 1,y) === colors.white){
                    this.Snakes[i].move(x + 1, y);
                }else if(this.currentMap.getIndexColour(x + 1,y) === colors.blue){
                    this.Snakes[i].add(x + 1, y);
                    this.currentMap.setIndexColour(x + 1, y,colors.white)
                    this.currentMap.setRandomIndexColour(colors.blue)
                }
            }
            if(this.direction===3 && y<this.currentMap.height-1){
                if(this.currentMap.getIndexColour(x ,y+1) === colors.white){
                    this.Snakes[i].move(x ,y+1);
                }else if(this.currentMap.getIndexColour(x ,y+1) === colors.blue){
                    this.Snakes[i].add(x ,y+1);
                    this.currentMap.setIndexColour(x ,y+1,colors.white)
                    this.currentMap.setRandomIndexColour(colors.blue)
                }
            }
            if(this.direction===1 && x>0){
                if(this.currentMap.getIndexColour(x -1,y) === colors.white){
                    this.Snakes[i].move(x -1,y);
                }else if(this.currentMap.getIndexColour(x -1,y) === colors.blue){
                    this.Snakes[i].add(x -1,y);
                    this.currentMap.setIndexColour(x -1,y,colors.white)
                    this.currentMap.setRandomIndexColour(colors.blue)
                }
            }
            if(this.direction===2 && y>0){
                if(this.currentMap.getIndexColour(x,y-1) === colors.white){
                    this.Snakes[i].move(x,y-1);
                }else if(this.currentMap.getIndexColour(x,y-1) === colors.blue){
                    this.Snakes[i].add(x,y-1);
                    this.currentMap.setIndexColour(x,y-1,colors.white)
                    this.currentMap.setRandomIndexColour(colors.blue)
                }
            }


        }
    };

    this.update = function() {
        this.moveSnakes();
        this.tick++;
    };

    this.step = function() {
        let self=this;
        self.cnt++;
        this.moveSnakes();
    };

    this.getScore = function() {
        return this.score
    };

    this.getDirection = function() {
        return this.direction
    };

    this.setScore = function(score) {
        this.score=score;
    };

    this.getInfo = function() {
    };
};
