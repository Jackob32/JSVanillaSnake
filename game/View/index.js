/**
 * View
 */
export default function(model, settings) {
    this.model=model;
    //this.model=this.controller.getModel();
    //  this.maxX=    this.model.getMaxX();
    // this.maxY=    this.model.getMaxY();

    this.setVisible = function() {
        console.log(this.model)
    };

    this.getModel = function() {
        return   this.model
    };

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
        element.innerHTML = model.getDirection();
    };

    this.drawMap = function(map) {
        let element = document.getElementById(settings.elementId);
        element.innerHTML = '';
        var table = document.createElement('table'),
            tr, td, row, cell;
        for (let p = 0; p < map.height; p++) {
            tr = document.createElement('tr');
            for (let i = 0; i < map.width; i++) {
                td = document.createElement('td');
                tr.appendChild(td);
                td.innerHTML = '';

                for (let k = 0; k < this.model.cntSnakes; k++) {
                    if(this.model?.Snakes?.[k].is(i,p)){
                        td.style.backgroundColor = "#"+this.model?.Snakes?.[k].color;
                    }else{
                        td.className = map.getIndexColour(i,p);
                    }
                }
            }
            table.appendChild(tr);
        }
        element.appendChild(table);
        element.innerHTML += map.cnt;
    };
};
