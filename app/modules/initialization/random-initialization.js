define("random-initialization", ["initialization", "random"], function(Initialization, Random) {
    
    "use strict";
    
    return class RandomInitialization extends Initialization {

        constructor(min, max){
            super();

            this.min = min;
            this.max = max;
        }

        initialize(problem){
            
            let array = new Array(problem.getNumberOfVariables());

            for(let i = 0; i < array.length; i++){
                array[i] = Random.randDouble(this.min, this.max);
            }
               
            return array;
        }
    };
});