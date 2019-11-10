const router = require('express').Router();
const sendEmail = require('../lib/send-email');

module.exports = () => {
  router.post('/reserve', (req, res, next) => {
    const { name, contact, number, place, date, time } = req.body;
    const mailOptions = {
      from: process.env.GMAIL,
      to: process.env.YUCH_EMAIL,
      subject: '유청 급식 예약 문의',
      html: `<p>이름: ${name} <br/> 연락처: ${contact}<br/> 인원수: ${number}<br/> 장소: ${place}<br/> 날짜: ${date}<br/> 예약시간: ${time}</p>`,
    };

    sendEmail(mailOptions)
      .then(() =>
        res.status(201).send('Reserve Email has been sent successfully!'),
      )
      .catch(err => {
        res.status(400).json(err);
        next(err);
      });
  });

  router.post('/bug', (req, res, next) => {
    const { error, errorInfo } = req.body;

    const mailOptions = {
      from: process.env.GMAIL,
      to: process.env.YUCH_EMAIL,
      subject: '유청 웹사이트 시스템 에러 리포트',
      html: `<p>${error} <br/><br/> ${errorInfo}</p>`,
    };

    sendEmail(mailOptions)
      .then(() => res.status(201).send('Email has been sent successfully!'))
      .catch(err => {
        res.status(400).json(err);
        next(err);
      });
  });

  return router;
};
