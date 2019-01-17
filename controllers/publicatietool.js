
let express = require('express');
let router = express.Router();
let mailer = require('../models/mailer');
let docx = require('../models/docxBuilder');
let publicatie = require('../models/publicatie')
let path = require('path');

/* GET users listing. */
router.post('/create', async function(req, res, next) {

  if (!req.body) {
    return new Error('No form data found.');
  }

    //extract input from body
  let docxInput = {};
  for (let key in req.body) {
    docxInput[key] = req.body[key];
  };

    //prepare everything for the docxBuilder model
  publicatie.cleanInput(docxInput);
  publicatie.setType(docxInput);
  publicatie.setTerms(docxInput);  
  publicatie.formatDutchDates(docxInput);
  publicatie.setTemplates(docxInput);

    //per doc needed, create docs and add filePath to doc obj and attachment array
  let attachments = []; 
  
  for (let doc in docxInput.docs) {
    let template = docxInput.docs[doc].template;
    let outputName = docxInput.docs[doc].outputName;
    
    docxInput.docs[doc].pathName = await docx.create(docxInput, template, outputName);
    attachments.push({path: docxInput.docs[doc].pathName});
  };

    //construct emaildata
  let messageData = {
    to: docxInput.email,
    from: 'Publicatietool <limbonetbot@gmail.com>',
    subject: 'Geautomatiseerde publicaties',
    text: 'Beste gebruiker, \n\nBedankt voor het gebruiken van de Publicatietool. Bijgevoegd vind je de publicaties. \n Opmerkingen of feedback? Reageer dan op deze mail.\n\nDeze mail is automatisch verstuurd.\n\n Met vriendelijke groet, \n Jerry Peeters',
    attachments: attachments
  };

  let sent = await mailer.send(messageData);
  
  if (sent.accepted) {
    res.sendFile(path.join(__dirname, '../', 'public', 'html', 'success.html'));
  } else {
    throw new Error('Failed to send email.');
  };
})

module.exports = router;
  

    /*send res 200OK message "Bestanden zijn naar je emailadres 
    gestuurd, check je spamfolder."*/  
