'use strict';

//abstract form handler and hider

//takes objects with 'Id': 'trueValue' ie. 'hasCar': 'yes'
//truevalue can also be an array 'Id': ['option0', 'option1', etc]
//if multieple options, name the optionals optional+Id+0 and count up.

let formHandler = {
    
    init(obj) {

        this.initValues = obj; //store initValues, never touch them
        this.storage = {}; //storage obj for DOM children

        for (let id in obj) {
            document.getElementById(id).addEventListener("change", event => this.updateForm(event) );
        }
        this.updateForm(); //defaults to checking all initValues, if Arg instanceof Event get id, if arg is string => id, else check all
    },
 
    updateForm(arg) {
        let id = (arg instanceof Event) ? arg.target.id 
               : (typeof arg === "string") ? arg 
               : false;
       
        if (!id) { //if no id given, do it for every id in initValues
            for (let id in this.initValues) {
                this.updateForm(id)
            }
        } else { //the core update functionality
            let targetValue = this.initValues[id];
            let value = document.getElementById(id).value;
            
            if (targetValue instanceof Array) { //multiple options
                for (let i = 0; i < targetValue.length; i++) {
                    let newId = `${id}` + i;
                    
                    if (targetValue[i] === value) {
                        this.appendOptions(newId);
                    } else {
                        this.removeOptions(newId);
                    };
                }
            }
            if (typeof targetValue === 'string') { //true/false option             
                if (targetValue === value){
                    this.appendOptions(id);
                } else this.removeOptions(id);
            }
        }
    },
    removeOptions(id) { //only for internal use

        let element = document.getElementById('optional' + id); //returns HTMLCollection
        if (!element.hasChildNodes()) return; //if already empty, return

        if (!this.storage[id]) {    //make storage container for Id
            this.storage[id] = {};
        };

        this.storage[id].element = element.cloneNode(true);

        while ( element.hasChildNodes() ) {
            element.removeChild(element.firstChild);
        };
    },
    appendOptions(id) {

        let element = document.getElementById('optional' + id);
       
        if (element.hasChildNodes()
            || !element
            || !this.storage[id]
            ) return;

        let children = this.storage[id].element.children;
            
        for (let i = 0; i < children.length; i++) {
            let child = children[i].cloneNode(true);
            element.appendChild(child);
        };
            //removing element (and storing it) als removes eventlistener, so we re-add it here
        for (let id in this.initValues) { 
            if (document.getElementById(id)) {
                document.getElementById(id).addEventListener("change", event => this.updateForm(event) );
            }           
        };
    }
}