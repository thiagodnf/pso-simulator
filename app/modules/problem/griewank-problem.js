define("griewank-problem", ["problem"], function(Problem) {
    
    "use strict";
    
    return class GriewankProblem extends Problem {

        constructor(){
            super(2);
        }

        evaluate(particle){

            let sum = 0.0;
            let prod = 0.0;

            for(let i = 0; i < 2; i++){

                let xi = particle.getPosition()[i];

                sum += Math.pow(xi, 2);

                prod *= Math.cos(xi / Math.sqrt(i + 1));
            }

            let value = 1.0 + ((1.0 / 4000.0) * sum) - prod;

            particle.setObjective(value);
        }

        getRangeOfTheVariable(variable){
            
            return {
                min: -600,
                max: 600
            };
        }

        getBestKnown(){
            return [
                [0, 0],
            ];
        }
    };

});