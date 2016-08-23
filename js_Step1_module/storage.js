(function(exports){
    'use strict';
    function Storage(){
        console.log('store created!');
    }
    exports.app = exports.app || {};
    exports.app.Store = Storage;
})(this);
