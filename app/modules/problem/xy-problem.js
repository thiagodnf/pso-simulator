define("xy-problem", ["problem"], function(Problem) {
    
    "use strict";
    
    return class XYProblem extends Problem {

        constructor(){
            super(2);
        }

        evaluate(particle){

            let sum = 0.0;
            
            for(let i = 0; i < 2; i++){
                sum += particle.getPosition()[i]
            }

            particle.setObjective(sum)
        }

        getRangeOfTheVariable(variable){
            // The function is usually evaluated on the hypercube 
            // xi in [-5.12, 5.12], for all i = 1, …, d. 
            return {
                min: -10,
                max: 10
            }
        }

        getBestKnown(){
            return [
                [0,0]
            ]
        }
    }

});