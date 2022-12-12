define("problem-range-initialization", ["initialization", "random"], function(Initialization, Random) {
    
    "use strict";
    
    return class RandomRangeVariableInitialization extends Initialization {

        constructor(){
            super();
        }

        initialize(problem){
            
            let array = new Array(problem.getNumberOfVariables());
            
            for(let i = 0; i < array.length; i++){
                
                let range = problem.getRangeOfTheVariable(i);

                array[i] = Random.randDouble(range.min, range.max);
            }
               
            return array;
        }
    };

});