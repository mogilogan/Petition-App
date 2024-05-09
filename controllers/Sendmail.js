const nodemailer = require("nodemailer");

const sendmail = async (req) => {
  const { mail, mobile_num, petition_id, p_name, closemsg, akn_num } = req;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions;

  if (closemsg === undefined) {
    mailOptions = {
      from: "pypetiton@gmail.com",
      to: mail,
      subject: "Petition Request Accepted",
      html: `<div><h1>Dear ${p_name}</h1><p>Your petition with Acknowledgement Number:${akn_num} has been successfully accepted and forwarded!</p></div>`,
    };
  } else {
    mailOptions = {
      from: "pypetiton@gmail.com",
      to: mail,
      subject: "Petition Closed!",
      text: `${closemsg}`,
    };
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = { sendmail };
