const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: "gbase7768@gmail.com",
    pass: "rcaztffuzxipohhr",
  },
  tls:{
    rejectUnauthorized: false,
  }
});

module.exports = transporter;