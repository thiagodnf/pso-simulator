define("branin-problem", ["problem"], function(Problem) {
    
    "use strict";
    
    return class BraninProblem extends Problem {

        constructor(){
            super(2);
        }

        evaluate(particle){

            let a = 1.0
            let b = 5.1 / (4.0 * Math.pow(Math.PI, 2.0))
            let c = 5.0 / Math.PI
            let r = 6.0
            let s = 10.0
            let t = 1.0 / (8.0 * Math.PI)
            let x1 = particle.getPosition()[0]
            let x2= particle.getPosition()[1]

            let value = a * Math.pow(x2 - b * Math.pow(x1, 2) + c * x1 - r, 2) + s * (1.0 - t) * Math.cos(x1) + s

            particle.setObjective(value)
        }

        getRangeOfTheVariable(variable){
            
            if (variable == 0){
                return {
                    min: -5,
                    max: 10
                }
            }
            
            return {
                min: 0,
                max: 15
            }
        }

        getBestKnown(){
            return [
                [-Math.PI, 12.275],
                [Math.PI, 2.275],
                [9.42478, 2.475]
            ]
        }
    }

});