define("initialization", function() {
    
    "use strict";
    
    return class Initialization {

        constructor(){

            if (this.constructor === Initialization) {
                throw new TypeError('Abstract class "Initialization" cannot be instantiated directly.'); 
            }

            if (this.initialize === undefined) {
                throw new TypeError('Classes extending Initialization class should implement "initialize" method');
            }
        }
    }

});