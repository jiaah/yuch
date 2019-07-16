const router = require('express').Router();
const sendEmail = require('../lib/send-email');

module.exports = () => {
  router.post('/', (req, res, next) => {
    const { name, contact, number, place, date, time } = req.body;
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: process.env.YUCH_EMAIL,
      subject: '유청 급식 예약 from 유청 홈페이지',
      html: `<p>이름: ${name} <br/> 연락처: ${contact}<br/> 인원수:${number}<br/> 장소:${place}<br/> 날짜:${date}<br/> 예약시간${time}</p>`,
    };

    sendEmail(mailOptions)
      .then(() => {
        res.status(201).send('Reserve Email has been sent successfully!');
      })
      .catch(err => {
        res.status(400).json(err);
        next(err);
      });
  });

  return router;
};
