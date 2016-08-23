(function(exports){
    'use strict';
    function Storage(name, callback){
        callback = callback || function(){};
        this._dbName = name;
        if(!localStorage[name]){
            var data = {
                todos:[]
            };
            localStorage[name] = JSON.stringify(data);
        }
    }

    Storage.prototype.findAll = function(callback){
        callback = callback || function() {};
        callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
    };

    Storage.prototype.save = function(updateData, callback, id){
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;
        callback = callback || function(){};

        if(id){
            for(var i = 0; i < todos.length; i++){
                if(todos[i].id === id){
                    for(var key in updateData){
                        todos[i][key] = updateData[key];
                    }
                    break;
                }
            }
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, todos);
        } else {
            updateData.id = new Date().getTime();

            todos.push(updateData);
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, [updateData]);
        }
    };

    Storage.prototype.remove = function(id, callback){
        console.log('Storage.prototype.remove execute!');
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        for (var i = 0; i < todos.length; i++) {
            if(todos[i].id == id){
                todos.splice(i, 1);
                break;
            }
        }
        localStorage[this._dbName] = JSON.stringify(data);
        console.log(callback);
        callback.call(this, todos);
    };

    Storage.prototype.find = function(query, callback){
        if(!callback){
            return ;
        }
        var todos = JSON.parse(localStorage[this._dbName]).todos;

        callback.call(this, todos.filter(function(todo){
            for(var q in query){
                if(query[q] !== todo[q]){
                    return false;
                }
            }
            return true;
        }));
    };

    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);
