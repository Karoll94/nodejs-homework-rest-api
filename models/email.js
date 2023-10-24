const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_SENDER, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_SENDER,
    pass: EMAIL_PASSWORD,
  },
});

const emailService = {
  sendEmail(email, verificationToken) {
    console.log("Sending email");
    transporter.sendMail(
      {
        from: EMAIL_SENDER, // sender address
        to: email, // list of receivers
        subject: "Hello ✔ Authenticate your email", // Subject line
        text: "Hello!! This is an email test", // plain text body
        html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}'>Verification email</a>`, // html body
      },
      (err, data) => {
        if (err) {
          console.log(err);
          console.log("An error ocurred");
        } else {
          console.log("Email sent successfully");
        }
      }
    );
  },
};

// console.log("mesagge")

module.exports = emailService;
