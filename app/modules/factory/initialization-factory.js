define("initialization-factory", [
    "fixed-value-initialization",
    "problem-range-initialization",
    "random-initialization",
    "uniformly-initialization"
], function(
    FixedValueInitialization,
    ProblemRangeInitialization,
    RandomInitialization,
    UniformlyInitialization,
) {
    
    "use strict";
    
    return class InitializationFactory {

        constructor(){
        }

        static getInitialization(key){
            
            if(key == "fixed-value-initialization"){
                return new FixedValueInitialization(0.0);
            }else if(key == "problem-range-initialization"){
                return new ProblemRangeInitialization();
            }else if(key == "random-initialization"){
                return new RandomInitialization(0.0, 1.0);
            }else if(key == "uniformly-initialization"){
                return new UniformlyInitialization();
            }

            alert("oi");
        }
    };

});