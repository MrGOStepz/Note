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