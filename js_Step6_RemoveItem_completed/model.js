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

    Model.prototype.read = function(query, callback){
        var queryType = typeof query;
        callback = callback || function(){};

        if(queryType === 'function'){
            callback = query;
            return this.storage.findAll(callback);
        } else if(queryType === 'string' || queryType === 'number'){//editItem
            query = parseInt(query, 10);
            this.storage.find({ id: query }, callback);
        } else {//removeCompletedItems
            this.storage.find(query, callback);
        }
    };

    Model.prototype.remove = function(id, callback){
        this.storage.remove(id, callback);
    };

    Model.prototype.update = function(id, data, callback){
        this.storage.save(data, callback, id);
    };

    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);
