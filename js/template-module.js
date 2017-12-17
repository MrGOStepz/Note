var template = (function() {
    var templateobject = {};
    //wait for window to load before selecting the template
    window.addEventListener('load', () => {

        //Load Template
        const tmpl = document.querySelector('#task-template');
        templateobject.template = tmpl;
        //Comment Console
        console.log("template-Module: window.addEventListener 'Load'");
    });

    templateobject.create = function(taskobj) {
        //Comment Console
        console.log("template-Module: templateobject.create");

        //import the content of the template
        let template = document.importNode(templateobject.template.content, true);
        let temphtml = template.querySelector('li');
        //fill the template with data from taskobj
        temphtml.setAttribute('data-id', taskobj.id);
        temphtml.setAttribute('data-status', taskobj.status);
        temphtml.setAttribute('data-name', taskobj.name);

        temphtml.querySelector('.task-text').innerText = taskobj.name;
        //temphtml.querySelector('.task-text').setAttribute('data-id',taskobj.id);
        //temphtml.querySelector('.task-row').setAttribute('data-id',taskobj.id);
        temphtml.querySelector('button[data-function="delete"]').setAttribute('data-id', taskobj.id);
        temphtml.querySelector('button[data-function="status"]').setAttribute('data-id', taskobj.id);
        console.log('template-Module: button[data-function="status"]');
        console.log(taskobj.id);

        return temphtml;
    }

    return templateobject;
}());