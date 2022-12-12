define([
    "jquery", 
    "bootstrap", 
    "d3",
    "pso", 
    "gui",
    "problem-factory",
    "initialization-factory",
], function(
    $, 
    Boostrap, 
    d3,
    PSO, 
    GUI,
    ProblemFactory,
    InitializationFactory
) {

    let pso = new PSO();
    let problem;
    let intervalID = 0;
    
    $("svg").height($(window).height() - $("svg").offset().top - 20);

    var xScale,
        yScale,
        xAxis,
        yAxis,
        iterations,
        swarmsBestKnown,
        svg,
        circles,
        width = $("svg").width(),
        height = $("svg").height();
      
    var padding = {
        top: 10,
        right: 20,
        bottom: 30,
        left: 40,
    };

    function startCanvas(xRange, yRange){
     
        xScale = d3.scale.linear();
        xScale.domain([xRange.min, xRange.max]).range([padding.left, width - padding.right]);
        
        yScale = d3.scale.linear();
        yScale.domain([yRange.min, yRange.max]).range([height - padding.bottom, padding.top + 30]);
        
        xAxis = d3.svg.axis();
        xAxis.scale(xScale).orient("bottom").ticks(10);
        
        yAxis = d3.svg.axis();
        yAxis.scale(yScale).orient("left").ticks(10);
        
        svg = d3.select("svg");
        
        svg.attr({
            width: width,
            height: height
        });
    }

    function addBestPoints(dataset){
       
        var bestSolutions = svg.append("g")
            .attr("id", "best-solutions")
            .attr("stroke", "black")
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("clip-path", "url(#chart-area)")
            .selectAll("circle");

        bestSolutions.data(dataset)
            .enter()
            .append("circle")
            .attr({
                cx: function (d) {
                    return xScale(d[0]);
                },
                cy: function (d) {
                    return yScale(d[1]);
                },
                r: function (d) {
                    return 10;
                },
            });
    }

    function updateSVG(){
        
        console.log("Cleaning the SVG Canvas");

        svg.html("");

        iterations = svg.append("g")
            .append("text")
            .text("0 Iterations")
            .attr("text-anchor", "middle")
            .attr("x", width - 60)
            .attr("y", 20);

        swarmsBestKnown = svg.append("g")
            .append("text")
            .text("Swarm's Best Known: ")
            .attr("text-anchor", "start")
            .attr("x", 20)
            .attr("y", 20);

        svg.append("g")
            .attr({
                class: "x-axis",
                transform: "translate(0," + (height - padding.bottom) + ")"
            })
            .call(xAxis);
        
        svg.append("g")
            .attr({
                class: "y-axis",
                transform: "translate(" + (padding.left) + ", 0)"
            })
            .call(yAxis);
        
        svg.append("clipPath")
            .attr("id", "chart-area")
            .append("rect")
            .attr({
                x: padding.left,
                y: padding.bottom,
                width: width,
                height: height
            });

        circles = svg.append("g")
            .attr("id", "circles")
            .attr("fill", "red")
            .attr("clip-path", "url(#chart-area)")
            .selectAll("circle");

        addBestPoints(problem.getBestKnown());
    }

    function start(){

        clearInterval(intervalID);

        pso.iterate();

        intervalID = setInterval(start, 100);
    }

    function loadParameters(){

        console.log("Loading parameters");

        pso.setNumberOfParticles($("#population-size").val());
        pso.setProblem(problem);
        pso.setPositionInitialization(InitializationFactory.getInitialization($("#position-initialization").getAsText()));
        pso.setVelocityInitialization(InitializationFactory.getInitialization($("#velocity-initialization").getAsText()));
        pso.setChangeVelocity($("#change-velocity").isChecked());
        pso.setKeepProblemsRange($("#keep-problems-range").isChecked());
        pso.setDecreaseInertia($("#decrease-inertia").isChecked());
        pso.setC1(parseFloat($("#param-c1").val()));
        pso.setC2(parseFloat($("#param-c2").val()));

        // let xRange = problem.getRangeOfTheVariable(0)
        // let yRange = problem.getRangeOfTheVariable(1)
        
        // // xScale.domain([xRange.min, xRange.max])
        // // yScale.domain([yRange.min, yRange.max])
    }

    function init(){

        console.log("Initializing PSO");

        pso = new PSO();
        
        pso.setOnInitAlgorithm(function(particles){

            let dataset = [];

            for(let i = 0; i < particles.length; i++){
                dataset.push(particles[i].getPosition());
            }

            circles.data(dataset)
                .enter()
                .append("circle")
                .attr({
                    cx: function (d) {
                        return xScale(d[0]);
                    },
                    cy: function (d) {
                        return yScale(d[1]);
                    },
                    r: function (d) {
                        return 3;
                    }
                });
        });

        pso.setOnAfterIteration(function(particles){

            let dataset = [];

            for(let i = 0; i < particles.length; i++){
                dataset.push(particles[i].getPosition());
            }

            svg.selectAll("circle")
                .data(dataset)
                // .transition()
                // .duration(0)
                .attr({
                cx: function (d) {
                    return xScale(d[0]);
                },
                cy: function (d) {
                    return yScale(d[1]);
                }
            });

            iterations.text(pso.getIterations() + " iterations");
            swarmsBestKnown.text("Swarm's Best Known: " + pso.getSwarmsBestKnown().getObjective().toFixed(10));
        });

        loadParameters();
        pso.createParticles();
    }

    $(function() {

        problem = ProblemFactory.getProblem($("#function").getAsText());

        startCanvas(problem.getRangeOfTheVariable(0), problem.getRangeOfTheVariable(1));

        updateSVG();

        init();
        
        $(".btn-step").click(function(event){
            event.preventDefault();

            pso.iterate();
        });

        $(".btn-play").click(function(event){
            event.preventDefault();

            start();

            $(".btn-stop").attr("disabled", false);
            $(".btn-restart").attr("disabled", true);
            $(".btn-play").attr("disabled", true);
            $(".btn-step").attr("disabled", true);
            $(".settings").attr("disabled", true);
        });

        $(".btn-stop").click(function(event){
            event.preventDefault();

            clearInterval(intervalID);
            
            $(".btn-stop").attr("disabled", true);
            $(".btn-restart").attr("disabled", false);
            $(".btn-play").attr("disabled", false);
            $(".btn-step").attr("disabled", false);
            $(".settings").attr("disabled", false);
        });

        $(".btn-restart").click(function(event){
            updateSVG();

            loadParameters();
            
            pso.restart();
        });

        $(".create-particles-on-change").change(function(event) { 
            event.preventDefault();

            updateSVG();

            loadParameters();
            
            pso.createParticles();
         });

         $(".init-velocity-on-change").change(function(event) { 
            pso.initVelocity();
         });

          $(".change-parameters").change(function(event) { 
            event.preventDefault();
            loadParameters();
          });

        $(".dispatch-change-problem").change(function(event) { 
            event.preventDefault();

            problem = ProblemFactory.getProblem($("#function").getAsText());

            startCanvas(problem.getRangeOfTheVariable(0), problem.getRangeOfTheVariable(1));

            updateSVG();

            init();
        });

        $(".dispatch-velocity-initialization").change(function(event) { 
            event.preventDefault();

            loadParameters();
        });
    });
});