(function(exports){
    'use strict';
    function View(template){
        console.log('view created!');
        this.template = template;
    }
    exports.app = exports.app || {};
    exports.app.View = View;
})(this);
