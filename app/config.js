
"use strict";

requirejs.config({
    paths: {
        // Vendors
        "jquery": "https://code.jquery.com/jquery-3.3.1.slim.min",
        "bootstrap": "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min",
        "d3": "https://d3js.org/d3.v3.min",
        
        //Plugins
        "jquery-plugin-select":  "plugins/jquery-plugin-select",
        "jquery-plugin-checkbox":  "plugins/jquery-plugin-checkbox",

        // Encoding
        "particle": "modules/encoding/particle",
        "problem":  "modules/encoding/problem",
        "initialization":  "modules/encoding/initialization",

        // Problems
        "sphere-problem":  "modules/problem/sphere-problem",
        "rastrigin-problem":  "modules/problem/rastrigin-problem",
        "xy-problem":  "modules/problem/xy-problem",
        "branin-problem":  "modules/problem/branin-problem",
        "rosenbrock-problem":  "modules/problem/rosenbrock-problem",
        "griewank-problem":  "modules/problem/griewank-problem",
        "easom-problem":  "modules/problem/easom-problem",
        
        // Initialization
        "fixed-value-initialization":  "modules/initialization/fixed-value-initialization",
        "random-initialization":  "modules/initialization/random-initialization",
        "problem-range-initialization":  "modules/initialization/problem-range-initialization",
        "uniformly-initialization":  "modules/initialization/uniformly-initialization",
        
        // Util
        "problem-factory":  "modules/factory/problem-factory",
        "initialization-factory":  "modules/factory/initialization-factory",
        
        // Util
        "random":  "modules/util/random",
        "gui":  "modules/util/gui",

        "pso": "modules/pso",
    },
    shim: {
        "bootstrap": ["jquery", "jquery-plugin-select", "jquery-plugin-checkbox"],
    }    
});

// Load the main app module to start the app
requirejs(["main"]);