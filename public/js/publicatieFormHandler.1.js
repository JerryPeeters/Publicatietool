'use strict';

//display:none werkt niet in IE11. Alternatief maken met appendChild en removeChild


document.getElementById('besluittype').addEventListener("change", e => {
    if (e.target.value === 'Vaststelling bestemmingsplan') {
        removeClass('VastBP');
        appendClass('OntwerpBP');
    } else if (e.target.value === 'Ontwerpbestemmingsplan') {
        removeClass('OntwerpBP');
        appendClass('VastBP')
    }
})

let reactiveFormIds = ['hasHGW', 'hasInloop'];

for (let id of reactiveFormIds) {
    document.getElementById(id).addEventListener("change", e => updatePublicatieForm(e) );
};


function appendClass(className) {
    let elements = document.getElementsByClassName(`${className}`); //returns Array-like
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    };
}

function removeClass(className) {
    let elements = document.getElementsByClassName(className); //returns Array-like
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
    };
}

//onchange='updatePublicatieForm()'

function updatePublicatieForm(event) { 
    
    let element = event.target;
    let elementId = element.id;
    
    if (element.value === 'Ja') {
        removeClass(element.id);
    } else if (element.value === 'Nee') {
        appendClass(elementId);
    };
}