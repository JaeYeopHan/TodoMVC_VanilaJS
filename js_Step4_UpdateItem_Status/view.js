(function(exports){
    'use strict';
    function View(template){
        this.template = template;

        this.$todoList = document.getElementById('todo-list'); //ul tag
        this.$newTodo = document.getElementById('new-todo'); //input tag
    }

    View.prototype.bind = function(event, handler){
        var self = this;
        var todo = self.$todoList;

        //event: newTodo
        //handler: controller.addItem
        if(event === 'newTodo'){
            var newtodo = self.$newTodo;
            newtodo.addEventListener('change', function(){
                handler(self.$newTodo.value); //addItem(self.$newTodo.value)
            });

        //event: itemRemove
        //handler: controller.removeItem
        } else if(event === 'itemRemove'){
            todo.addEventListener('click', function(event){
                var target = event.target;
                if(target.className === 'destroy'){
                    handler({id: self._getItemId(target.parentNode, 'li')});//=>item
                }
            });
        //event: itemToggle
        //handler: controller.toggleComplete
        } else if(event === 'itemToggle'){
            console.log('View.prototype.bind.itemToggle execute');
            todo.addEventListener('click', function(event){
                var target = event.target;
                if(target.className === 'toggle'){
                    handler({id: self._getItemId(target), completed: target.checked}); //=>item
                }
            });
        }
    };

    View.prototype.render = function(viewCmd, parameter){
        var self = this;
        var viewCommands = {
            //parameter로 넘어오는 값이 storage에 있는 모든 data이다. 모든 데이터를 출력하는 역할을 하는 메소드.
            showEntries : function(){
                self._addItem(parameter);
            },
            //입력을 마치고 나면 input tag안을 비워주는 역할을 하는 메소드.
            clearNewTodo : function(){
                self.$newTodo.value = '';
            },
            //넘겨받은 parameter에 해당하는 list를 화면상에서 지워주는 메소드.
            removeItem : function(){
                self._removeItem(parameter);
            },
            //parameter 값에는 id, completed 값이 저장되어 있다.
            elementComplete : function(){
                console.log('View.prototype.render.elementComplete execute');
                self._elementComplete(parameter.id, parameter.completed);
            }
        };
        viewCommands[viewCmd]();
    };

    View.prototype._addItem = function(id){
        this.$todoList.innerHTML = this.template.insert(id);
    };

    View.prototype._removeItem = function(id){
        var elem = document.querySelector('[data-id="' + id + '"]');
        if(elem){
            this.$todoList.removeChild(elem);
        }
    };

    //click event가 발생한 list의 id값을 잡아주는 역할
    View.prototype._getItemId = function(element, tagName){
        var li;
        if(tagName){
            if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()){
                li = element.parentNode;
            }
        } else {
            li = element.parentNode.parentNode;
        }

        return parseInt(li.dataset.id, 10);//HTML data-*에서 *이 id인 값을 10진수로 parsing함
    };

    View.prototype._elementComplete = function(id, completed){
        console.log('View.prototype.render._elementComplete execute');
        var listItem = document.querySelector('[data-id="' + id +'"]');
        if(listItem){
            listItem.className = completed ? 'completed' : '';
        }
    };

    exports.app = exports.app || {};
    exports.app.View = View;
})(this);
