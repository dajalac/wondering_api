const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); 

const sendUserEmail = (userEmail, link) =>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth :{
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    })
   
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: userEmail,
        subject: 'Reset password',
        text: 'You are receiving this email because you have requested the reset to the password of your account.\n\n'
        +'To reset your password click in the link below \n'
        +`${link} \n`
        +'If you did not request the password resert, please ignore this email'
    }

    transporter.sendMail(mailOptions, (err, response) =>{
        if (err){
            console.error('unable to send email', err)
        }else{
            console.log(response)
        }
    } )

    console.log (link)
}

module.exports={
    sendUserEmail: sendUserEmail,
}