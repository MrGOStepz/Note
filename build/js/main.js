class Task{
  constructor(task){
    this.name = task;
    this.id = new Date().getTime();
    this.status = 0;
    return this;
  }
}

//form module
var formmodule = (
    function() {
        var formobj = {};

        //Add Input
        const formelm = document.getElementById('task-form');
        const inputelm = document.getElementById('task-input');

        formobj.getValue = function() {
                //Comment Console
                console.log("Form-Module: formobj.getValue");
                inputval = inputelm.value;
                formobj.val = inputval;
                //Comment Console
                console.log("Form-Module: return inputval" + inputval);
                return inputval;
            }
            //Comment Console
        console.log("Form-Module: return formobj" + formobj);
        return formobj;
    }()
);
var task = (function() {
        var object = {};
        object.taskArray = [];

        object.add = function(taskname) {
            //Comment Console
            console.log("Task-Module: object.add");
            let taskitem = new Task(taskname);
            object.taskArray.push(taskitem);
            object.sort();
            console.log(object.taskArray);
        }

        object.changeStatus = function(id, status) {
            //Comment Console
            console.log("Task-Module: object.changeStatus");
            console.log("Task-Module: status");
            let taskcount = object.taskArray.length;
            for (let i = 0; i < taskcount; i++) {
                let item = object.taskArray[i];
                if (item.id == id) {
                    item.status = status;
                    break;
                    return true;
                }
            }
            object.sort();
        }

        object.toggleChangeStatus = function(id) {
            //Comment Console
            console.log("Task-Module: object.toggleChangeStatus");
            console.log("Task-Module: status");
            let taskcount = object.taskArray.length;
            for (let i = 0; i < taskcount; i++) {
                let item = object.taskArray[i];
                if (item.id == id) {
                    console.log("Task-Module:" + item.status);
                    if (item.status == 0) {

                        item.status = 1;
                    } else {
                        item.status = 0;
                    }
                    break;
                    return true;
                }
            }
            object.sort();
        }

        object.delete = function(id) {
            //Comment Console
            console.log("Task-Module: object.delete");
            let taskcount = object.taskArray.length;
            for (let i = 0; i < taskcount; i++) {
                let item = object.taskArray[i];
                if (item.id == id) {
                    object.taskArray.splice(i, 1);
                    break;
                    return true;
                }
            }
        }

        object.alldelete = function() {
            //Comment Console
            console.log("Task-Module: object.alldelete");
            object.taskArray.splice(0, object.taskArray.length);
        }

        object.deleteticked = function() {
            //Comment Console
            console.log("Task-Module: object.deleteticked");
            let taskcount = object.taskArray.length;
            let statusCount = 0;
            console.log(object.taskArray);
            for (let i = 0; i < taskcount; i++) {
                let item = object.taskArray[i];
                console.log("object.deleteticked: count loop OUT" + i);
                console.log(item);
                if (item.status == 1) {
                    statusCount++;
                }
            }
            object.taskArray.splice(object.taskArray.length - statusCount, statusCount);
        }

        object.untick = function() {
            //Comment Console
            console.log("Task-Module: object.untick");
            let taskcount = object.taskArray.length;
            for (let i = 0; i < taskcount; i++) {
                object.taskArray[i].status = 0;
            }
        }

        object.sort = function() {
                if (settings.sort = "status") {
                    //sort array according to its status
                    object.taskArray.sort(function(task1, task2) {
                        return parseInt(task1.status) - parseInt(task2.status);
                    });
                } else if (settings.sort = "date") {
                    object.taskArray.sort(function(task1, task2) {
                        return parseInt(task1.id) - parseInt(task2.id);
                    });
                }
            }
            //Comment Console
        console.log("Task-Module: object.sort");
        return object;


    }
    ());
var storage = (function() {
    var stg = {};
    stg.store = function(arr) {

        //Comment Console
        console.log("Storage-Module: stg.store");
        console.log("Storage-Module: arr");
        console.log(arr);

        let data = JSON.stringify(arr);
        stg.data = data;
        window.localStorage.setItem("data", data);
    }
    stg.read = function() {

        //Comment Console
        console.log("Storage-Module: stg.read");
        if (window.localStorage.getItem("data")) {
            try {
                if (JSON.parse(localStorage.getItem("data"))) {
                    let data = JSON.parse(localStorage.getItem("data"));
                }
            } catch (error) {
                console.log("error" + error);
            }
            let data = window.localStorage.getItem("data");
            return JSON.parse(data);
        } else {
            return false;
        }
    }
    return stg;
}());
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
var settings = (function() {
    var module = {};
    window.addEventListener('load', () => {
        module.menu = document.querySelector('.settings-panel');
        module.btn = document.querySelector('.settings-button');
        module.form = document.querySelector('#settings');
        module.alldelete = document.querySelector('#delete-all');
        module.untick = document.querySelector('#untick-all');
        module.deleteticked = document.querySelector('#delete-ticked');
        module.init();
    });
    module.init = function() {
        module.btn.addEventListener('click', () => {
            //toggle menu
            module.toggleMenu();
        });
        module.form.addEventListener('change', () => {
            module.getSort();
            task.sort();
            uimodule.render();
        });
        module.alldelete.addEventListener('click', () => {
            console.log("Setting: module.alldelete");
            task.alldelete();
            uimodule.render();
            storage.store(task.taskArray);
        });
        module.deleteticked.addEventListener('click', () => {
            console.log("Setting: module.deleteticked");
            task.deleteticked();
            uimodule.render();
            storage.store(task.taskArray);
        });
        module.untick.addEventListener('click', () => {
            console.log("Setting: module.untick");
            task.untick();
            uimodule.render();
            storage.store(task.taskArray);
        });
        module.getSort();
    }
    module.toggleMenu = function() {
        if (module.menu.classList.contains('open')) {
            // menu is open, remove the open class -- close the menu
            module.menu.classList.remove('open');
            module.btn.classList.remove('open');
        } else {
            //menu is closed, open it by adding class open
            module.menu.classList.add('open');
            module.btn.classList.add('open');
        }
    }
    module.getSort = function() {
        module.sort = document.querySelector("[name='sort']:checked").value;
    }
    return module;
}());
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        console.log("Drop down Click");
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
var app = (function() {
    const form = document.getElementById('task-form');
    form.addEventListener('submit', (event) => {
        //Comment Console
        console.log("Main-Module: form.addEventListener 'Submit'");
        event.preventDefault();
        let newtask = formmodule.getValue();
        if (newtask) {
            task.add(newtask);
            storage.store(task.taskArray);
            uimodule.render();
        }
        form.reset();
    });
    uimodule.bindListener();
    window.addEventListener('load', () => {
        //check if read returns valid data eg if storage is not empty

        //Comment Console
        console.log("Main-Module: form.addEventListener 'Load'");

        if (storage.read()) {
            task.taskArray = storage.read();
        }
        uimodule.render();
    });
}());