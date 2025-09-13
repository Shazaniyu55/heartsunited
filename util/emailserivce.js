const nodemailer = require("nodemailer");
require('dotenv').config();
const APP_NAME = "HeartsUnited";

const transporter = nodemailer.createTransport({
  service: "gmail", // SMTP host for Namecheap email
  auth: {
    user: "heartsuinted@gmail.com", // your business email
    pass: process.env.EMAIL_PASS, // password from Namecheap email account
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("Mailing failed to to to verify.", err);
  } else {
    console.log("Mailing verified", success);
  }
});

/**
 * Send Email
 */
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"${APP_NAME}" <heartsuinted@gmail.com>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
