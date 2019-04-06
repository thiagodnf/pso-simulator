define("problem-factory", [
    "sphere-problem",
    "rastrigin-problem",
    "xy-problem",
    "branin-problem",
    "rosenbrock-problem",
    "griewank-problem",
    "easom-problem"
], function(
    SphereProblem,
    RastriginProblem,
    XYProblem,
    BraninProblem,
    RosenbrockProblem,
    GriewankProblem,
    EasomProblem,
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
            }else if(key == "griewank-problem"){
                return new GriewankProblem()
            }else if(key == "easom-problem"){
                return new EasomProblem()
            }

            alert("Ooops...! No problem was found")
        }
    }

});