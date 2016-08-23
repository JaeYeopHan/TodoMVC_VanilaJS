(function(exports){
    'use strict';
    function Controller(model, view){
        console.log('controller created!');
        this.model = model;
        this.view = view;
    }
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);
