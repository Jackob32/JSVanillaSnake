export default function Snake(color, x, y, bodyX=[], bodY=[]) {
    this.color = color;
    this.body={x:bodyX,y:bodY};
    this.body.x.push(x);
    this.body.y.push(y);

    this.getLength = function() {
        return this.body.x.length;
    };

    this.getBody = function() {
        return this.body;
    };

    this.move = function(x, y) {
        //  delete last one if snake is longer then
        if(this.body.x.length>1 && this.body.y.length>1) {
            this.body.x.shift();
            this.body.y.shift();
        }
        this.body.x.push(x);
        this.body.y.push(y);
    };

    this.add = function(x, y) {
        this.body.x.push(x);
        this.body.y.push(y);
    };

    this.headX = function() {
        return this.body.x[this.body.x.length-1];
    };
    this.headY = function() {
        return this.body.y[this.body.y.length-1];
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
        for (let i = 0; i < this.body.x.length; i++) {
            if(this.body.x[i]===x && this.body.y[i]===y)
                return true
        }
        return false
    };
}