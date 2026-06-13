const nodemailer = require("nodemailer")

const sendEmail = async (to,subject,text)=> {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log(`[EMAIL SKIPPED] To: ${to}`);
        console.log(`[EMAIL SKIPPED] Subject: ${subject}`);
        console.log(`[EMAIL SKIPPED] Message: ${text}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try{
        const mailOptions = {
            from:process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions) 
    }catch(error){
        console.error("Nodemailer Error:", error);
        throw new Error("Email sending failed");
    }
};
module.exports = sendEmail;
