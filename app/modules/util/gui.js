define("gui", ["jquery"], function($) {
    
    "use strict";
    
    return class GUI {

        constructor(){
        }

        static SVG(tag) {
            return document.createElementNS('http://www.w3.org/2000/svg', tag);
        }

        static getCircle(id, x, y, color){
            return $(this.SVG('circle'))
                .attr('id', id)
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 3)
                .attr('fill', color)
        }

    }

});