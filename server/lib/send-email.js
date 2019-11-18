const sgMail = require('@sendgrid/mail');

const sendEmail = mailOptions => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  return sgMail.send(mailOptions);
};

module.exports = sendEmail;
