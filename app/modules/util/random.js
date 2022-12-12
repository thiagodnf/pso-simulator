define("random", function() {
    
    "use strict";
    
    return class Random {

        constructor(numberOfVariables){

            if (this.constructor === Problem) {
                throw new TypeError("Abstract class \"Problem\" cannot be instantiated directly."); 
            }
        }

        static randInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        static randDouble(min, max) {
            return Math.random() * (max - min) + min;
        }
    };
});