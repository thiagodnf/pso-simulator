define("rastrigin-problem", ["problem"], function(Problem) {
    
    //"use strict";
    
    return class RastriginProblem extends Problem {

        constructor(){
            super(2);
            
        }

        evaluate(particle){

            let n = super.getNumberOfVariables()
            
            let value = 10 * n
            
            for(let i = 0; i < n; i++){
                value += Math.pow(particle.getPosition()[i], 2) - 10 * Math.cos(2 * Math.PI * particle.getPosition()[i]);
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