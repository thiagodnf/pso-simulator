define("problem-factory", [
    "sphere-problem",
    "rastrigin-problem",
    "xy-problem",
    "branin-problem",
    "rosenbrock-problem",
], function(
    SphereProblem,
    RastriginProblem,
    XYProblem,
    BraninProblem,
    RosenbrockProblem,
) {
    
    "use strict";
    
    return class ProblemFactory {

        constructor(){ }

        static getProblem(key){
            
            if(key == "sphere-problem"){
                return new SphereProblem();
            }else if(key == "rastrigin-problem"){
                return new RastriginProblem()
            }else if(key == "xy-problem"){
                return new XYProblem()
            }else if(key == "branin-problem"){
                return new BraninProblem()
            }else if(key == "rosenbrock-problem"){
                return new RosenbrockProblem()
            }

            alert("Ooops...! No problem was found")
        }
    }

});