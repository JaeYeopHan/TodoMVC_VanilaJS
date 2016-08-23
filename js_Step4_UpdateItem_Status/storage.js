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
            console.log('Storage.prototype.save execute');
            //updateData에 해당하는 값으로 localStorage에 값을 수정한다.
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
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        for (var i = 0; i < todos.length; i++) {
            if(todos[i].id == id){
                todos.splice(i, 1);
                break;
            }
        }
        localStorage[this._dbName] = JSON.stringify(data);
        callback.call(this, todos);
    };

    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);
