define("fixed-value-initialization", ["initialization"], function(Initialization) {
    
    "use strict";
    
    return class FixedValueInitialization extends Initialization {

        constructor(value){
            super();

            this.value = value
        }

        initialize(problem){
            
            let array = new Array(problem.getNumberOfVariables());

            for(let i = 0; i < array.length; i++){
                array[i] = this.value;
            }
               
            return array;
        }
    }
});