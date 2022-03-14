const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "30d2052e807587",
    pass: "0492380c219a7b",
  },
});

module.exports = transporter;
