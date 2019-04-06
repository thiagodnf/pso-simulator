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

    let pso = new PSO()
    let intervalID = 0;
    
    $("svg").height($(window).height() - $("svg").offset().top - 20);

    var xRange = [-6, 6];
    var yRange = [-6, 6];

    var padding = {
        top: 10,
        right: 10,
        bottom: 30,
        left: 30,
    }

    var xScale,
        yScale,
        xAxis,
        yAxis,
        iterations,
        svg,
        circles,
        width = $("svg").width(),
        height = $("svg").height()
      
    xScale = d3.scale.linear();
    xScale.domain([xRange[0], xRange[1]]).range([30, width-padding.right]);
    
    yScale = d3.scale.linear();
    yScale.domain([yRange[0], yRange[1]]).range([height - padding.bottom, padding.top + 30]);
    
    xAxis = d3.svg.axis();
    xAxis.scale(xScale).orient('bottom').ticks(10);
    
    yAxis = d3.svg.axis();
    yAxis.scale(yScale).orient('left').ticks(10);
    
    svg = d3.select('svg');
    
    svg.attr({
        width: width,
        height: height
    });

    
    
    function addBestPoints(dataset){
       
        var bestSolutions = svg.append('g')
            .attr('id', 'best-solutions')
            .attr('stroke', 'black')
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .attr('clip-path', 'url(#chart-area)')
            .selectAll('circle')

        bestSolutions.data(dataset)
            .enter()
            .append('circle')
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
        
        svg.html("");

        iterations = svg.append('g')
            .append('text')
            .text("0 Iterations")
            .attr("x", 20)
            .attr("y", 20)

        svg.append('g')
            .attr({
                class: 'x-axis',
                transform: 'translate(0,' + (height - padding.bottom) + ')'
            })
            .call(xAxis);
        
        svg.append('g')
            .attr({
                class: 'y-axis',
                transform: 'translate(' + padding.bottom + ', 0)'
            })
            .call(yAxis);
        
        svg.append('clipPath')
            .attr('id', 'chart-area')
            .append('rect')
            .attr({
                x: padding.left,
                y: padding.bottom,
                width: width,
                height: height
            });

        circles = svg.append('g')
            .attr('id', 'circles')
            .attr('fill', 'red')
            .attr('clip-path', 'url(#chart-area)')
            .selectAll('circle');
        
        texts = svg.append('g')
            .attr('id', 'texts')
            .attr('clip-path', 'url(#chart-area)')
            .selectAll('text');

            texts.data([[width/2, height/2]]).enter()
            .append('text')
            .text("0 Iterations")
            .attr({
                x: function (d) {
                    return xScale(d[0]);
                },
                y: function (d) {
                    return yScale(d[1]);
                },
                r: function (d) {
                    return 2;
                }
            });
    }

    function start(){

        clearInterval(intervalID);

        pso.iterate()

        intervalID = setInterval(start, 50);
    }

    function init(){

        pso = new PSO()

        let problem = ProblemFactory.getProblem($('#function').find(":selected").val())

        pso.setNumberOfParticles($("#population-size").val())
        pso.setProblem(problem)
        pso.setPositionInitialization(InitializationFactory.getInitialization($('#position-initialization').find(":selected").val()));
        pso.setVelocityInitialization(InitializationFactory.getInitialization($('#velocity-initialization').find(":selected").val()));

        

        let xRange = problem.getRangeOfTheVariable(0)
        let yRange = problem.getRangeOfTheVariable(1)
        
        xScale.domain([xRange.min, xRange.max]).range([30, width-padding.right]);
        yScale.domain([yRange.min, yRange.max]).range([height - padding.bottom, padding.top + 30]);

        
        updateSVG()

        addBestPoints(problem.getBestKnown())

        pso.setOnInitAlgorithm(function(particles){

            let dataset = [];

            for(let i = 0; i < particles.length; i++){
                dataset.push(particles[i].getPosition())
            }

            circles.data(dataset)
                .enter()
                .append('circle')
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
                dataset.push(particles[i].getPosition())
            }

            svg.selectAll('circle')
                .data(dataset)
                 .transition()
                 .duration(200)
                 .ease("linear")
                .attr({
                cx: function (d) {
                    return xScale(d[0]);
                },
                cy: function (d) {
                    return yScale(d[1]);
                }
            });

            iterations.text(pso.getIterations()+" iterations")
        })

        pso.init();
    }

    $(function() {

        init()

        $(".btn-step").click(function(event){
            event.preventDefault();

            pso.iterate()
        });

        $(".btn-play").click(function(event){
            event.preventDefault();

            start();

            $(".btn-stop").attr("disabled", false);
            $(".btn-play").attr("disabled", true);
            $(".btn-step").attr("disabled", true);
            $(".settings").attr("disabled", true);
        });

        $(".btn-stop").click(function(event){
            event.preventDefault();

            clearInterval(intervalID);
            
            $(".btn-stop").attr("disabled", true);
            $(".btn-play").attr("disabled", false);
            $(".btn-step").attr("disabled", false);
            $(".settings").attr("disabled", false);
        });

        $('.settings').change(function(event) { 
            event.preventDefault();
            
            init()
         });

        
    });
});