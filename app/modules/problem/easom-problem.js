define("easom-problem", ["problem"], function(Problem) {
    
    "use strict";
    
    return class EasomProblem extends Problem {

        constructor(){
            super(2);
        }

        evaluate(particle){

            let x1 = particle.getPosition()[0];
            let x2 = particle.getPosition()[1];

            let value = -Math.cos(x1) * Math.cos(x2) * Math.exp(-Math.pow(x1 - Math.PI, 2) - Math.pow(x2 - Math.PI, 2));
            
            particle.setObjective(value);
        }

        getRangeOfTheVariable(variable){
            return {
                min: -100,
                max: 100
            };
        }

        getBestKnown(){
            return [
                [Math.PI, Math.PI],
            ];
        }
    };

});