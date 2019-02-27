const router = require('express').Router();
const sgMail = require('@sendgrid/mail');
const {
  SENDGRID_API_KEY,
  MY_EMAIL,
  YUCH_EMAIL,
} = require('../../secrets/sendgrid_config');

module.exports = () => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  router.post('/', (req, res) => {
    const { name, contact, number, place, date, time } = req.body;

    const mailOptions = {
      from: MY_EMAIL,
      to: YUCH_EMAIL,
      subject: '유청 급식 예약 from 유청 홈페이지',
      html: `<p>이름: ${name} <br/> 연락처: ${contact}<br/> 인원수:${number}<br/> 장소:${place}<br/> 날짜:${date}<br/> 예약시간${time}</p>`,
    };
    sgMail
      .send(mailOptions)
      .then(() =>
        res.status(201).send('Reserve Email has been sent successfully!'),
      )
      .catch(err => {
        console.log(err); // eslint-disable-line
        res.status(400).json(err);
      });
  });

  return router;
};
