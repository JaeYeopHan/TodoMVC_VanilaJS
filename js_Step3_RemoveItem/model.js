(function(exports){
    'use strict';
    function Model(storage){
        this.storage = storage;
    }

    Model.prototype.create = function(title, callback){
        title = title || '';
        callback = callback || function () {};

        var newItem = {
            title : title.trim(),
            completed : false
        };
        this.storage.save(newItem, callback);
    };

    Model.prototype.read = function(callback){
        return this.storage.findAll(callback);
    };

    Model.prototype.remove = function(id, callback){
        this.storage.remove(id, callback);
    };

    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);
