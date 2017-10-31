var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'm3anh1r@gmail.com',
		pass: '1234567890Go'
    }
}));

var mailOptions = {
  from: 'm3anh1r@gmail.com',
  to: 'm3anh1r@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 