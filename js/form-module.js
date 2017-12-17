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