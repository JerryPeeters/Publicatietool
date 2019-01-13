'use strict';

let mailer = require('../models/mailer');

let testobj = {
    to: "jerrypeeters@gmail.com",
    subject: "mailerTest",
    text: "This message is created by the mailerTest.js Node tester.",
    attachments: [
        {path: '../models/docxtemplates/template_OntwerpBPStaatscourant.docx'},
        {path: '../models/docxtemplates/template_OntwerpBPWebsite.docx'}
    ]
};

mailer.send(testobj)
.then( () => console.log('Mail test succesful.') )
.catch( err => console.log(err) );