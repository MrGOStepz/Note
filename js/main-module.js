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