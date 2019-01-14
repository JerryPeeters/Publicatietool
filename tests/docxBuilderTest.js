'use strict';

let docx = require('../models/docxBuilder');
let publicatie = require('../models/publicatie');

async function docxTest() {

    let testobj = {
        'besluittype': 'Ontwerpbestemmingsplan',
        'plannaam': 'Zuidermuur',
        'besluitdatum': '1-1-2019',
        'stednummer': 'STED3837BP-0301',
        'verseonnummer': '2018/26780',
        'omschrijving1': 'planomschrijving',
        'locatie_omschrijving': 'Aan de randweg.',
        'start_terinzagelegging': '2-2-2019', 
        'einde_terinzagelegging': '3-2-2019', 
        'publicatiedatum': '2-1-2019',
        'email': 'jerrypeeters@gmail.com',

        'hasHGW': true,
        'besluitdatum_HGW': '9-1-2019',
        'omschrijving_HGW': '4-1-2019',
        
        //vaststelling
        'hasChw': true,
        'hasGewijzigd': true,

        //ontwerp
        'hasMER': true,
        'MERbesluit': 'default=Besloten is om voor het (ontwerp)bestemmingsplan geen m.e.r.-procedure te doorlopen, aangezien de conclusie van de m.e.r.-beoordeling is dat er geen nadelige milieueffecten te verwachten zijn.',
            
        'hasInloop': true,
        'omschrijving_inloop': 'hele coole inloopavond, trust me',
        
        'contactpersoon': 'J. Peeters',
        'bereikbaarheid_contactpersoon': '10:00 en 10:30, behalve op woensdagen,',
        'aanhef_contactpersoon': 'dhr.',
        'contactpersoon_hemhaar': 'hem'

    };

    publicatie.setType(testobj);
    publicatie.setTemplates(testobj);
    
    // console.log(testobj);
    // await docx.create(testobj, testobj.docs.Staatscourant.template, testobj.docs.Staatscourant.outputName);

    for (let doc in testobj.docs) {
        let template = testobj.docs[doc].template;
        let outputName = testobj.docs[doc].outputName;
        
        testobj.docs[doc].pathName = await docx.create(testobj, template, outputName);
      };
};

docxTest();