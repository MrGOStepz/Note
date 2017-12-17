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