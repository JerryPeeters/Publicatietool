'use strict';

//this should be in its own page-specific script
let reactiveFormClasses =  {
    'besluittype': ['Ontwerpbestemmingsplan', 'Vaststelling bestemmingsplan'],
    'hasHGW': 'Ja',
    'hasInloop': 'Ja'
}

//abstract form handler and hider
let formHandler = {
    
        //takes objects with 'Id': 'trueValue' ie. 'hasCar': 'yes'
    init(obj) {

        this.initValues = {};
        for (let id in obj) {
            this.initValues[id] = {
                'value': obj[id]    //makes object to storage later children
            }
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
            let targetValue = this.initValues[id].value;
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
            if (typeof targetValue === 'string') {                
                if (targetValue === value){
                    this.appendOptions(id);
                } else this.removeOptions(id);
            }
        }
    },
    removeOptions(id) { //only for internal use

        let element = document.getElementById('optional' + id); //returns HTMLCollection

        this.initValues[id].element = element.cloneNode(true);

        while ( element.hasChildNodes() ) {
            element.removeChild(element.firstChild);
        };
    },
    appendOptions(id) {

        let element = document.getElementById('optional' + id);
        if (element.hasChildNodes()) return; //check if it already exists in the document

        let children = this.initValues[id].element.children;
        if (!children || !element) return;
        
        for (let i = 0; i < children.length; i++) {
            let child = children[i].cloneNode(true);
            element.appendChild(child);
        };
    }
}


formHandler.init(reactiveFormClasses);
