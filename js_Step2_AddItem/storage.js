(function(exports){
    'use strict';
    //name : The name of our DB we want to use
    function Storage(name, callback){
        console.log('storage created!');
        callback = callback || function(){};

        this._dbName = name;
        //application 실행 1회 때만 생성한다!
        if(!localStorage[name]){
            var data = {
                todos:[]//배열로 생성하여, index로 접근이 가능하도록 한다.
            };
            localStorage[name] = JSON.stringify(data);
        }
    }

    Storage.prototype.findAll = function(callback){
        console.log('Storage.findAll method execute!');
        callback = callback || function() {};
        callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
    };

    Storage.prototype.save = function(updateData, callback, id){
        console.log('Storage.save method execute!');
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        callback = callback || function(){};

        if(id){
            for(var i = 0; i < todos.length; i++){
                if(todos[i].id === id){
                    for(var key in updateData){
                        todo[i][key] = updateData[key];
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

    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);
