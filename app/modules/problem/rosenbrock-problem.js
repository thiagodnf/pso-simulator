define("rosenbrock-problem", ["problem"], function(Problem) {
    
    "use strict";
    
    return class RosenbrockProblem extends Problem {

        constructor(){
            super(2);
        }

        evaluate(particle){

            let a = 1.0
            let b = 100
            let x = particle.getPosition()[0]
            let y = particle.getPosition()[1]

            let value = Math.pow(a  - x, 2) + b * Math.pow(y - Math.pow(x,2),2) 

            particle.setObjective(value)
        }

        getRangeOfTheVariable(variable){
            
           return {
                min: -2,
                max: 2
            }
        }

        getBestKnown(){
            return [
                [1, 1],
            ]
        }
    }

});