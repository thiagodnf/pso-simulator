define("uniformly-initialization", ["initialization", "random"], function(Initialization, Random) {
    
    "use strict";
    
    return class UniformlyInitialization extends Initialization {

        constructor(){
            super();
        }

        initialize(problem){
            
            let array = new Array(problem.getNumberOfVariables());
            
            //Initialize the particle's velocity: vi ~ U(-|bup-blo|, |bup-blo|)

            for(let i = 0; i < array.length; i++){
                
                let range = problem.getRangeOfTheVariable(i);

                let blo = range.min;
                let bup = range.max;
               
                // U(-|bup-blo|
                let min = -Math.abs(bup - blo);
                // |bup-blo|
                let max = Math.abs(bup - blo);

                array[i] = Random.randDouble(min, max);
            }
               
            return array;
        }
    };
});