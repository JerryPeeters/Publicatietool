'use strict';

document.getElementById('besluittype').addEventListener("change", e => {
    if (e.target.value === 'Vaststelling bestemmingsplan') {
        showClass('VastBP');
        hideClass('OntwerpBP');
    } else if (e.target.value === 'Ontwerpbestemmingsplan') {
        showClass('OntwerpBP');
        hideClass('VastBP')
    }
})

let reactiveFormIds = ['hasHGW', 'hasInloop'];

for (let id of reactiveFormIds) {
    document.getElementById(id).addEventListener("change", e => updatePublicatieForm(e) );
};


function hideClass(className) {
    let elements = document.getElementsByClassName(`${className}`); //returns Array-like
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    };
}

function showClass(className) {
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
        console.log(elementId);
        showClass(element.id);
    } else if (element.value === 'Nee') {
        hideClass(elementId);
    };
}