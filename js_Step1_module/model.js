(function(exports){
    'use strict';
    function Model(store){
        console.log('Model created!');
        this.store = store;
    }
    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);
