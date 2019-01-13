'use strict';

let docx = require('../models/docxBuilder');

async function docxTest() {

    let testobj = {
        'plannaam': 'Zuidermuur',
        'besluittype': 'Ontwerpbestemmingsplan',
        'besluitdatum': '',
        'startTerinzagelegging': '',
        'eindeTerinzagelegging': '',
        'omschrijving1': 'Dit plan maakt een muur mogelijk aan de zuidgrens van het grondgebied. Hiermee wordt voorkomen dat Zaanstad een achtertuin van Amsterdam wordt en haar eigen identieit weet te behouden.',
        'email':'voorbeeld@zaanstad.nl',
        'template': 'OntwerpBPStaatscourant',
        'outputName': 'Publicatie Ontwerpbestemmingsplan Zuidermuur'   
    };

    let path = await docx.create(testobj, 'OntwerpBPWebsite');

    console.log(path);
};

docxTest();