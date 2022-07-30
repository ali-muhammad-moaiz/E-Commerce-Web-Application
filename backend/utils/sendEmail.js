var nodemailer = require('nodemailer');

function sendEmail(urlChangePass, userEmail){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
          user: "alimuhammed02111@gmail.com",
          pass: process.env.EMAIL_PASSWORD
        }
    });
      
    var mailOptions = {
        from: 'alimuhammed02111@gmail.com',
        to: userEmail,
        subject: 'E-STORE: USER ACCOUNT PASSWORD RECOVERY',
        text: "Click the link below to change your account's password:\n\n"+urlChangePass+"\n\nThe link will work for 15 minutes only.\n\n\n\nIf you have not requested for this email, kindly ignore it!"
    };
    
    const sendEmail = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Reset link sent.\n' + info.response);
        }
    });
}

module.exports = {sendEmail};