define("pso", [
    "particle", 
    "random",
    "fixed-value-initialization",
    "random-initialization"
], function(
    Particle, 
    Random,
    FixedValueInitialization,
    RandomInitialization
) {
    
    "use strict";

    return class PSO {

        constructor(){
            this.particles = []
            this.swarmsBestKnown = new Particle();
            this.positionInitialization = new RandomInitialization(0.0, 1.0)
            this.velocityInitialization = new FixedValueInitialization(0.0)
            this.w = 0.8;
            this.iterations = 0
            this.c1 = 1;
            this.c2 = 1;
        }

        getIterations(){
            return this.iterations;
        }

        setNumberOfParticles(numberOfParticles){
            this.numberOfParticles = numberOfParticles;
        }

        setPositionInitialization(positionInitialization){
            this.positionInitialization = positionInitialization
        }

        setVelocityInitialization(velocityInitialization){
            this.velocityInitialization = velocityInitialization
        }

        setProblem(problem){
            this.problem = problem
        }

        getCognitiveComponent(particle){

            let value = 0.0;

            for(let i in particle.getPosition()){
                value ++ 
            }

            return value;
        }

        updateVelocity(particle, inertia){

            let w = inertia || 1
            
            for(let i in particle.getPosition()){

                let vt = particle.getVelocity()[i];
                let cognitive = particle.getBestKnown().getPosition()[i] - particle.getPosition()[i];
                let social = this.swarmsBestKnown.getPosition()[i] - particle.getPosition()[i];
                let r1 = Random.randDouble(0,1)
                let r2 = Random.randDouble(0,1)
                let c1 = this.c1;
                let c2 = this.c1;

                particle.velocity[i] = w*vt + r1*c1*cognitive + r2*c2*social;
            }
        }

        updatePosition(particle){

            for(let i in particle.getPosition()){
                particle.position[i] = particle.position[i] + particle.velocity[i]
            }
        }

        getInitialPosition(problem){
            return this.positionInitialization.initialize(problem)
        }

        getInitialVelocity(problem){
            return this.velocityInitialization.initialize(problem)
        }

        getParticles(){
            return this.particles;
        }

        getSwarmsBestKnown(){
            return this.swarmsBestKnown;
        }

        setOnAfterIteration(callback){
            this.onAfterIteration = callback
        }

        setOnInitAlgorithm(callback){
            this.onInitAlgorithm = callback
        }

        init(){
            
            this.particles = new Array()

            for(let i = 0; i < this.numberOfParticles; i++){

                let particle = new Particle()

                //Initialize the particle's position
                particle.setPosition(this.getInitialPosition(this.problem));
                //Initialize the particle's position
                particle.setVelocity(this.getInitialVelocity(this.problem));
                // Initialize the particle's best known position to its initial position
                particle.setBestKnown(particle.copy())
                // Evaluate the particle
                this.problem.evaluate(particle)
                // if f(pi) < f(g) then update the swarm's best known  position: g ← pi
                if(particle.getObjective() < this.swarmsBestKnown.getObjective()){
                    this.swarmsBestKnown = particle.copy();
                }
                //Initialize the particle's velocity: vi ~ U(-|bup-blo|, |bup-blo|)
                this.updateVelocity(particle)

                this.particles.push(particle)
            }

            this.onInitAlgorithm(this.particles)
        }

        iterate(){
        
            // for each particle i = 1, ..., S do
            for(let i = 0; i < this.numberOfParticles; i++){
                    
                let particle = this.particles[i];

                // for each dimension d = 1, ..., n do
                this.updateVelocity(particle, this.w)

                 //Update the particle's position: xi ← xi + vi
                this.updatePosition(particle);

                // Evaluate the particle
                this.problem.evaluate(particle)
            
                //if f(xi) < f(pi) then Update the particle's best known position: pi ← xi
                if (particle.getObjective() < particle.getBestKnown().getObjective()){
                    
                    particle.setBestKnown(particle.copy())

                    // if f(pi) < f(g) then Update the swarm's best known position: g ← pi
                    if (particle.getObjective() < this.swarmsBestKnown.getObjective()){
                        this.swarmsBestKnown = particle.copy();
                    }
                }
            }

            this.iterations++;

            this.onAfterIteration(this.particles)
        }
    }

    
});