var uimodule = (function() {
    var module = {};
    const listelem = document.getElementById('task-list');
    module.render = function() {
        //Comment Console
        console.log("UI-Module: module.render");
        let tasks = task.taskArray;
        listelem.innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            let item = tasks[i];
            //create a template
            let listitem = template.create(item);

            listelem.appendChild(listitem);
        }
    }
    module.bindListener = function() {
        listelem.addEventListener('click', (event) => {
            //get the id of the task
            //itemid = event.target.getAttribute('data-id');
            //Comment Console
            console.log("UI-Module: module.bindListener");

            if (event.target.getAttribute('data-function') == 'status') {
                itemid = event.target.getAttribute('data-id');
                //task.changeStatus(itemid, 1);
                task.toggleChangeStatus(itemid);
            }
            if (event.target.getAttribute('data-function') == 'delete') {
                itemid = event.target.getAttribute('data-id');
                task.delete(itemid);
            }
            module.render();
            storage.store(task.taskArray);


        });
    }
    return module;
}());