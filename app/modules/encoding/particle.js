define("particle", function() {
    
    "use strict";
    
    return class Particle {

        constructor(){
            this.objective = Number.MAX_VALUE;
            this.bestKnown = undefined;
            this.velocity = [];
            this.position = [];
        }

        setBestKnown(bestKnown){
            return this.bestKnown = bestKnown;
        }

        getBestKnown(){
            return this.bestKnown;
        }

        getVelocity(){
            return this.velocity;
        }

        setVelocity(velocity){
            this.velocity = velocity;
        }
        
        getPosition(){
            return this.position;
        }

        setPosition(position){
            this.position = position;
        }

        getObjective(){
            return this.objective;
        }

        setObjective(objective){
            this.objective = objective;
        }

        copy() {

            let copy = new Particle();

            copy.setObjective(this.getObjective());
            copy.setPosition(this.getPosition().slice(0));
            copy.setVelocity(this.getVelocity().slice(0));
            
            return copy;
        }
    };

});
