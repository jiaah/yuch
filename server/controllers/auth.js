const knex = require('../database');
const util = require('../lib/util');
const sendEmail = require('../lib/send-email');

/* --- Login --- */
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  let id;
  let companyName;
  let userData;
  let isAdmin;
  return knex('users')
    .where({ username })
    .first()
    .then(user => {
      userData = user;
      id = user.id;
      companyName = user.companyName;
      isAdmin = user.isAdmin;
      if (!user) {
        return res.status(404).json('User not found');
      }
      return util.comparePassword(password, user.password);
    })
    .then(isMatch => {
      if (isMatch) {
        const token = util.getRandomToken(userData);
        return token;
      }
      return res.status(409).json('Auth failed');
    })
    .then(token => {
      res.header('Authorization', `Bearer + ${token}`);
      return res.status(200).json({ token, id, companyName, isAdmin });
    })
    .catch(err => res.status(500).json(err));
};

/* --- Admin --- */
// check admin password for security
exports.checkAdminUser = (req, res) => {
  const { password } = req.body;
  return knex('users')
    .where({ isAdmin: true })
    .first()
    .then(user => util.comparePassword(password, user.password))
    .then(isMatch => {
      if (isMatch) {
        return res.status(200).json();
      }
      return res.status(409).json('Auth failed');
    })
    .catch(err => res.status(500).json(err));
};

/* --- Forgot username/password --- */
exports.forgotUsername = (req, res) =>
  knex('users')
    .where({ email: req.body.email })
    .first()
    .then(user => {
      if (!user || user === undefined) {
        return res.status(409).json('Can not find user email');
      }
      if (user) {
        return res.status(200).json(user.username);
      }
    });

exports.forgotPassword = (req, res) => {
  const { username, email } = req.body;

  return knex('users')
    .where({ username, email })
    .first()
    .then(async user => {
      if (user) {
        const token = await util.getRandomToken(user);

        const mailOptions = {
          from: process.env.GMAIL,
          to: user.email,
          subject: '비밀번호 변경 요청',
          html: `${username} 회원님의 유청 계정에 대한 비밀번호 변경 요청을 접수하였습니다. <br/><br/> 비밀번호를 재설정하기위해, 아래 링크를 클릭하거나 복사하여서 브라우저로 가세요.<br/> 링크는 1시간동안 활성 상태로 유지됩니다. <br/><br/> http://${
            req.headers.host
          }/reset/${token} <br/><br/>만약 회원님이 비밀번호를 요청하지 않으셨다면 이 이메일을 무시하세요. <br/> 회원님의 비밀번호는 변경되지 않습니다.`,
        };

        return sendEmail(mailOptions)
          .then(() => {
            res.status(201).send('Reserve Email has been sent successfully!');
          })
          .catch(err => {
            res.status(400).json(err);
            next(err);
          });
      }
      return res.status(409).json('Can not find user email');
    });
};
