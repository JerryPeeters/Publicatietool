'use strict';

let nodemailer = require('nodemailer');

let serverConfig = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'limbonetbot@gmail.com',
        pass: 'automatiseerme!1'
    }
};

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