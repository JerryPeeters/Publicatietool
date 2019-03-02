
let express = require('express');
let router = express.Router();
let mailer = require('../models/mailer');
let docx = require('../models/docxBuilder');
let publicatie = require('../models/publicatie')
let path = require('path');

router.get('/', (req, res) => {
  res.render('publicatietool');
});

router.post('/create', async function(req, res, next) {

    /* Chinese abuse checker
    Can't check typeof without req.body = true,
    will throw error otherwise.
    Ternary will assign value at first true, so it wont 
    throw an error if there is no req.body because
    it won't get to the typeof check. */
  let passCheck = !req.body ? false :
                  !(typeof req.body.controlevraag === 'string') ? false :
                  (req.body.controlevraag.length > 8) ? false :
                  req.body.controlevraag.includes('Zaandam') ? true :
                  req.body.controlevraag.includes('zaandam') ? true :
                  false;
  
  if (!passCheck) {
    console.log('passCheck failed.');
    next();
  };

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
    from: 'Publicatietool <publicatietool@gmail.com>',
    subject: 'Geautomatiseerde publicaties',
    text: 'Beste gebruiker, \n\nBedankt voor het gebruiken van de Publicatietool. Bijgevoegd vind je de publicaties. \nOpmerkingen of feedback? Reageer dan op deze mail.\n\nDeze mail is automatisch verstuurd.',
    attachments: attachments
  };

  try {
    let sent = await mailer.send(messageData);
    if (sent.accepted) {
      res.render('publicatietoolsuccess');
    };
  } catch(err) { 
      console.log(err);
      next();
  };
})

module.exports = router;
  
