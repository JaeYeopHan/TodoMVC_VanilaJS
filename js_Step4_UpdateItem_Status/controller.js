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
        //이 부분이 추가되었다.
        //itemToggle 이벤트를 기다리기 위해 view 에 bind 해준다.
        this.view.bind('itemToggle', function(item){
            console.log('Controller.prototype 에서 bind 호출 elementComplete execute');
            self.toggleComplete(item.id, item.completed);
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
        console.log('Controller.prototyep.toggleComplete execute');
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

    //exposure
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);
