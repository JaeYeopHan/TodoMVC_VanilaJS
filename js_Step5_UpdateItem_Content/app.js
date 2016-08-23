(function(){
    'use strict';
    function App(){
        console.log('App created!');
        this.storage = new app.Storage(name);
        this.model = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
    }
    var todo = new App();
})();
