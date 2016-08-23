(function(exports){
    'use strict';
    function Controller(model, view){
        this.model = model;
        this.view = view;
        var self = this;
        this.view.bind('newTodo', function(title){
            self.addItem(title);
        });
        this.view.bind('itemRemove', function(item){
            self.removeItem(item.id);
        });
        this.showAll();//initializing!
    }

    Controller.prototype.showAll = function(){
        var self = this;
        this.model.read(function(data){
            self.view.render('showEntries', data);
        });
    };

    Controller.prototype.addItem = function(title){
        var self = this;
        if(title.trim() === ''){
            return;
        }
        self.model.create(title, function(){//값을 저장할 object를 생성한다.
            self.view.render('clearNewTodo', title);//input tag를 비워준다.
        });
        this.showAll();
    };

    Controller.prototype.removeItem = function(id){
        var self = this;
        self.model.remove(id, function(){
            self.view.render('removeItem', id);
        });
    };

    //exposure
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);
