
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/create', async function(req, res, next) {
  console.log(req.body);
  if (!req.body) {
    return new Error('No form data found.');
  }
  try {
    let userInput = req.body;
    await docx.build(userInput); //should return path to file
    //email docx
    /*send res 200OK message "Bestanden zijn naar je emailadres 
    gestuurd, check je spamfolder."*/
  }
  catch(err) {
     throw err;
  }
});

module.exports = router;
