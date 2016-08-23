(function(window){
    'use strict';
    function App(){
        this.storage = new app.Storage();
        this.model = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
    }
    var todo = new App();
})(this);
