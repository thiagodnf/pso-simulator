define("problem", function() {
    
    "use strict";
    
    return class Problem {

        constructor(numberOfVariables){

            if (this.constructor === Problem) {
                throw new TypeError('Abstract class "Problem" cannot be instantiated directly.'); 
            }

            if (this.evaluate === undefined) {
                throw new TypeError('Classes extending Problem class should implement "evaluate" method');
            }

            if (this.getRangeOfTheVariable === undefined) {
                throw new TypeError('Classes extending Problem class should implement "getRangeOfVariable" method');
            }

            if (this.getBestKnown === undefined) {
                throw new TypeError('Classes extending Problem class should implement "getBestKnown" method');
            }

            this.numberOfVariables = numberOfVariables
        }

        getNumberOfVariables(){
            return this.numberOfVariables
        }
    }

});