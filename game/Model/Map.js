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
    pink:"pink",
}

const getColor = function() {
    return randColors[Math.floor(Math.random()*(randColors.length-1))];
};

/**
 * Map
 */
export default function Map(height, width, colourCnt) {
    this.height = height;
    this.width = width;
    this.map = [];
    this.cnt = 0;

    for (let i = 0; i < this.height; i++) {
        this.map[i] = [];
        for (let p = 0; p < this.width; p++) {
            let x = Math.floor((Math.random() * 10) + 1);
            if(x===1){
                this.map[i][p] = "black";
            }else{
                this.map[i][p] = "white";
            }
        }
    }

    this.map[3][6] = "red";
    this.map[9][2] = "black";
    this.map[7][0] = "green";
    this.map[3][4] = "blue";

    this.setIndexColour = function(x,y,colour) {
        this.map[x][y] = colour;
    };

    this.setRandomIndexColour = function(colour) {

        while(1){
            let x = Math.floor((Math.random())*this.width);
            let y = Math.floor((Math.random())*this.height);
            if(this.getIndexColour(x,y)==="white"){
                this.setIndexColour(x,y,colour);
                return;
            }
        }
    };

    this.getIndexColour = function(x,y) {
        return this.map?.[x]?.[y] || "white";
    };
}