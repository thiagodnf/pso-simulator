define("xy-problem", ["problem"], function(Problem) {
    
    "use strict";
    
    return class XYProblem extends Problem {

        constructor(){
            super(2);
        }

        evaluate(particle){

            let sum = 0.0;
            
            for(let i = 0; i < 2; i++){
                sum += particle.getPosition()[i];
            }

            particle.setObjective(sum);
        }

        getRangeOfTheVariable(variable){
            return {
                min: 0,
                max: 10
            };
        }

        getBestKnown(){
            return [
                [0,0]
            ];
        }
    };

});