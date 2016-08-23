(function(exports){
    'use strict';
    function Controller(model, view){
        console.log('controller created!');
        this.model = model;
        this.view = view;
        var self = this;
        //bind를 통해 레코드 변경을 자동적으로 view에 반영한다.
        this.view.bind('newTodo', function(title){
            self.addItem(title);
        });
        this.showAll();//initializing!
    }

    Controller.prototype.showAll = function(){
        console.log('Controller.showAll method execute!');
        var self = this;
        this.model.read(function(data){
            self.view.render('showEntries', data);
        });
    };

    Controller.prototype.addItem = function(title){
        console.log('Controller.addItem method execute!');
        var self = this;
        if(title.trim() === ''){
            return;
        }
        self.model.create(title, function(){//값을 저장할 object를 생성한다.
            self.view.render('clearNewTodo', title);//input tag를 비워준다.
        });
        this.showAll();
    };

    //exposure
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);
