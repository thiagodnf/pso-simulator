define("jquery-plugin-checkbox", ["jquery"], function($) {
    
    "use strict";
    
    $.fn.isChecked = function() {

        if ($(this).is(":checked")){
            return true;
        }

        return false;
    };
});