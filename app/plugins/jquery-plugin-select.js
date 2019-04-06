define("jquery-plugin-select", ["jquery"], function($) {
    
    "use strict";
    
    $.fn.getAsText = function() {
        return $(this).find(":selected").val();
    };
});