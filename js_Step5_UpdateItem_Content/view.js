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
                handler(self.$newTodo.value);
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
            todo.addEventListener('click', function(event){
                var target = event.target;
                if(target.className === 'toggle'){
                    handler({id: self._getItemId(target), completed: target.checked}); //=>item
                }
            });
        //event: itemEdit
        //handler: controller.editItem
        } else if(event === 'itemEdit'){
            console.log('View.prototype.bind.itemEdit execute');
            todo.addEventListener('dblclick', function(event){
                var target = event.target;
                if(target.tagName.toLowerCase() === 'label'){
                    handler({id: self._getItemId(target)});
                }
            });
        //event: itemEditDone
        //handler: editItemSave
        } else if(event === 'itemEditDone'){
            todo.addEventListener('keypress', function(event){
                if(event.keyCode === 13){ //Enter key's kecode = 13
                    var target = event.target;
                    handler({id: self._itemId(target), title: target.value});
                }
            });
        }
    };

    View.prototype._itemId = function(element){
        var li = element.parentNode;
        console.log('return value = ' + li.dataset.id);
        return parseInt(li.dataset.id, 10);
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
                self._elementComplete(parameter.id, parameter.completed);
            },
            //parameter의 id, title을 넘겨준다.
            editItem : function(){
                console.log('View.prototype.render.editItem execute');
                self._editItem(parameter.id, parameter.title);
            },
            //parameter의 id, title을 넘겨준다.
            editItemDone : function(){
                console.log('View.prototype.render.editItemDone execute');
                self._editItemDone(parameter.id, parameter.title);
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
        console.log('return value = ' + li.dataset.id);
        return parseInt(li.dataset.id, 10);
    };

    View.prototype._elementComplete = function(id, completed){
        var listItem = document.querySelector('[data-id="' + id +'"]');
        if(listItem){
            listItem.className = completed ? 'completed' : '';
        }
    };

    View.prototype._editItem = function(id, title){
        console.log('View.prototype._editItem execute');
        var listItem = document.querySelector('[data-id="' + id +'"]');

        if(listItem){
            listItem.className = listItem.className + 'editing';

            var input = document.createElement('input');
            input.className = 'edit';

            listItem.appendChild(input);
            input.focus();
            input.value = title;
        }
    };

    View.prototype._editItemDone = function(id, title){
        console.log('View.prototype._editItemDone execute');
        var listItem = document.querySelector('[data-id="' + id +'"]');

        if(listItem){
            var input = document.querySelector('input.edit', listItem);
            listItem.removeChild(input);
            listItem.className = listItem.className.replace('editing', '');

            var label = document.querySelectorAll('label');
            label.forEach(function(label){
                if(label.parentNode.parentNode === listItem){
                    label.textContent = title;
                }
            });
        }
    };


    exports.app = exports.app || {};
    exports.app.View = View;
})(this);
