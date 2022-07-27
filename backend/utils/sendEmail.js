var nodemailer = require('nodemailer');

function sendEmail(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
          user: "alimuhammed02111@gmail.com",
          pass: process.env.EMAIL_PASSWORD
        }
    });
      
    var mailOptions = {
        from: 'alimuhammed02111@gmail.com',
        to: 'alimuhammad.moaiz@gmail.com',
        subject: 'E-STORE: USER ACCOUNT PASSWORD RECOVERY',
        text: 'That was easy!'
    };
      
    const sendEmail = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {sendEmail};