const nodemailer = require("nodemailer");

const sendmail = (req) => {
  const { mail, petition_id, p_name, closemsg } = req;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_ID,
      pass: process.env.PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
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
      text: `Dear ${p_name}, Your petition with peititon ID:${petition_id} has been successfully accepted and forwarded!`,
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
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = { sendmail };
