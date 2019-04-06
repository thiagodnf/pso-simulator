define("sphere-problem", ["problem"], function(Problem) {
    
    "use strict";
    
    return class SphereProblem extends Problem {

        constructor(){
            super(2);
        }

        evaluate(particle){

            let value = 0.0;
            
            for(let i = 0; i < 2; i++){
                value += Math.pow(particle.getPosition()[i], 2);
            }

            particle.setObjective(value)
        }

        getRangeOfTheVariable(variable){
            // The function is usually evaluated on the hypercube 
            // xi in [-5.12, 5.12], for all i = 1, …, d. 
            return {
                min: -5.12,
                max: 5.12
            }
        }

        getBestKnown(){
            return [
                [0,0]
            ]
        }
    }

});