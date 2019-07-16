const sgMail = require('@sendgrid/mail');

const sendEmail = mailOptions => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  return new Promise((resolve, reject) => {
    sgMail
      .send(mailOptions)
      .then(() => resolve())
      .catch(err => reject(new Error(`Sending an email failed : ${err}`)));
  });
};

module.exports = sendEmail;
