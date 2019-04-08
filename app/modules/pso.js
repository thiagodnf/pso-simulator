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
            
            this.positionInitialization = new RandomInitialization(0.0, 1.0)
            this.velocityInitialization = new FixedValueInitialization(0.0)
            this.w = 0.9
            this.c1 = 1.4
            this.c2 = 0.01
            this.iterations = 0
            this.swarmsBestKnown = new Particle()
            this.changeVelocity = false
            this.keepProblemsRange = true
            this.decreaseInertia = true
        }

        getIterations(){
            return this.iterations;
        }

        setC1(c1){
            this.c1 = c1
        }

        setC2(c2){
            this.c2 = c2
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

        setKeepProblemsRange(value){
            this.keepProblemsRange = value ;
        }

        setChangeVelocity(value){
            this.changeVelocity = value ;
        }

        setDecreaseInertia(value){
            this.decreaseInertia = value;
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
                let c2 = this.c2;

                particle.velocity[i] = w * vt + r1 * c1 * cognitive + r2 * c2 * social;
            }
        }

        updatePosition(particle){

            for(let i in particle.getPosition()){
               
                particle.position[i] = particle.position[i] + particle.velocity[i]

                let range = this.problem.getRangeOfTheVariable(i)

                if (this.keepProblemsRange && particle.position[i] < range.min) {
                    
                    particle.position[i] = range.min
                    
                    if (this.changeVelocity){
                        particle.velocity[i] = -0.5 * particle.velocity[i];
                    }
                }

                if (this.keepProblemsRange && particle.position[i] > range.max) {
                    
                    particle.position[i] = range.max
                    
                    if (this.changeVelocity){
                        particle.velocity[i] = -0.5 * particle.velocity[i];
                    }
                }
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

        copy(array){
            let copy = []

            for(let i = 0; i < array.length; i++){
                copy.push(array[i].copy())
            }

            return copy;
        }

        createParticles(){
            
            this.particles = new Array()

            for(let i = 0; i < this.numberOfParticles; i++){
                this.particles.push(new Particle())
            }

            this.initPosition();
            this.initVelocity();

            this.initialParticles = this.copy(this.particles)

            for (let i = 0; i < this.numberOfParticles; i++){
                this.initialParticles[i].setBestKnown(this.initialParticles[i].copy())
            }

            this.onInitAlgorithm(this.particles)
        }

        initPosition(){

            for(let i = 0; i < this.numberOfParticles; i++){
                
                let particle = this.particles[i];

                particle.setPosition(this.getInitialPosition(this.problem));

                // Initialize the particle's best known position to its initial position
                particle.setBestKnown(particle.copy())
               
                // Evaluate the particle
                this.problem.evaluate(particle)
            }

            this.findSwarmsBestKwnow()
        }

        initVelocity(){

            for(let i = 0; i < this.numberOfParticles; i++){
                
                let particle = this.particles[i];

                //Initialize the particle's velocity: vi ~ U(-|bup-blo|, |bup-blo|)
                particle.setVelocity(this.getInitialVelocity(this.problem));
            }
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

            if(this.iterations % 10 == 0){

                if(this.decreaseInertia){

                    if(this.w.toFixed(1) != 0.4){
                        this.w -= 0.05
                    }
                }
            }

            this.onAfterIteration(this.particles)
        }

        restart(){
            this.iterations = 0
            this.swarmsBestKnown = new Particle()

            this.particles = this.copy(this.initialParticles)

            for(let i = 0; i < this.numberOfParticles; i++){
                this.particles[i].setBestKnown(this.particles[i].copy())
            }

            this.findSwarmsBestKwnow()

            this.onInitAlgorithm(this.particles)
        }

        findSwarmsBestKwnow(){
            
            for(let i = 0; i < this.numberOfParticles; i++){
                
                let particle = this.particles[i];

                // if f(pi) < f(g) then update the swarm's best known  position: g ← pi
                if(particle.getObjective() < this.swarmsBestKnown.getObjective()){
                    this.swarmsBestKnown = particle.copy();
                }
            }
        }
    }

    

    
});