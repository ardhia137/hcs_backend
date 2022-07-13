const nodemailer = require('nodemailer');
const env = require('dotenv');
env.config();

// console.log(process.env.EMAIL_USER);
//connect akun gmail lewat env
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });

  const sendmail = (email,otp) =>{
    const options = {
        form : "'pukimenaja' <no-reply@gmail.com>",
        to : email,
        subject : "HealthCareSolution",
        text : "kode otp anda adalah "+otp
    }
    transporter.sendMail(options,(err,info)=>{
        if(err) console.log(err);
        console.log('email terkirim')
    })
  }
  module.exports = {sendmail};
