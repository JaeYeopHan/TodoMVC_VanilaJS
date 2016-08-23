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
        this.view.bind('itemToggle', function(item){
            self.toggleComplete(item.id, item.completed);
        });
        this.view.bind('itemEdit', function(item){
            self.editItem(item.id);
        });
        this.view.bind('itemEditDone', function(item){
            self.editItemSave(item.id, item.title);
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

    Controller.prototype.toggleComplete = function(id, completed){
        var self = this;
        //model에게 변동된 사항을 전달한다.
        self.model.update(id, {completed: completed}, function(){
            //model로 부터 변동된 data을 전달받는다.
            self.view.render('elementComplete', {
                id: id,
                completed: completed
            });
        });
    };

    Controller.prototype.editItem = function(id){
        console.log('Controller.prototype.editItem execute');
        var self = this;
        self.model.read(id, function(data){
            self.view.render('editItem', {id: id, title: data[0].title});
        });
    };

    Controller.prototype.editItemSave = function(id, title){
        console.log('Controller.prototype.editItemSave execute');
        var self = this;
        title = title.trim();

        if(title.length !== 0){
            self.model.update(id, {title: title}, function(){
                self.view.render('editItemDone', {id: id, title: title});
            });
        } else {
            self.removeItem(id);
        }
    };

    //exposure
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);
