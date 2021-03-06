'use strict';

let nodemailer = require('nodemailer');
let serverConfig = require('../emailCredentials'); //keep credentials off public Github

let transporter = nodemailer.createTransport(serverConfig);

//see https://nodemailer.com/message/ for message configuration
exports.send = (messageData) => transporter.sendMail(messageData);



/* To verify connection use:
transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
}); 
*/