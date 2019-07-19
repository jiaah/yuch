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

/* --- Password --- */
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

const setPassword = (id, newPassword) =>
  new Promise((resolve, reject) => {
    util.bcryptPassword(newPassword).then(hashedPassword =>
      knex('users')
        .where({ id })
        .first()
        .update({
          password: hashedPassword,
        })
        .then(() => resolve())
        .catch(() => reject(new Error('Auth failed'))),
    );
  });

exports.changePassword = (req, res) => {
  const { id, password, newPassword } = req.body;
  knex('users')
    .where({ id })
    .first()
    .then(user => {
      if (!user) {
        return res.status(401).json('Auth failed');
      }
      util.comparePassword(password, user.password).then(isMatch => {
        if (isMatch) {
          return setPassword(id, newPassword)
            .then(() => res.status(200).json())
            .catch(err => res.status(409).json(err));
        }
        return res.status(409).json('Auth failed');
      });
    })
    .catch(err => res.status(500).json(err));
};

// reset user's password by admin (password check is not required)
exports.resetPassword = (req, res) => {
  const { id, newPassword } = req.body;
  setPassword(id, newPassword)
    .then(() => res.status(200).json())
    .catch(err => res.status(409).json(err));
};

// when user forgot password
exports.resetPasswordWithToken = (req, res) => {
  const { newPassword, now } = req.body;
  const { token } = req.params;

  return knex('users')
    .where({ resetPasswordToken: token })
    .andWhere('resetPasswordExpires', '>', now)
    .first()
    .then(user => {
      if (user) {
        const id = user.id;
        return setPassword(id, newPassword)
          .then(() =>
            knex('users')
              .where({
                id,
              })
              .first()
              .update({
                resetPasswordToken: null,
                resetPasswordExpires: null,
              }),
          )
          .then(() => res.status(200).json())
          .catch(err => res.status(409).json(err));
      }
      return res.status(409).json('Access token is invalid or has expired');
    })
    .catch(err => res.status(409).json(err));
};

/* --- Forgot username/password --- */
exports.forgotUsername = (req, res) =>
  knex('users')
    .where({ email: req.body.email })
    .first()
    .then(user => {
      if (user) {
        return res.status(200).json(user.username);
      }
      return res.status(409).json('Can not find user email');
    })
    .catch(() => res.status(500).json('Can not find user email'));

exports.forgotPassword = (req, res) => {
  const { username, email, inOneHour } = req.body;

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
          html: `${username} 회원님의 유청 계정에 대한 비밀번호 변경 요청을 접수하였습니다. <br/><br/> 비밀번호를 재설정하기위해, 아래 링크를 클릭하거나 복사하여서 브라우저로 가세요. <br/> 링크는 1시간동안 활성 상태로 유지됩니다. <br/><br/> http://${
            req.headers.host
          }/reset?token=${token} <br/><br/> 만약 회원님이 비밀번호를 요청하지 않으셨다면 이 이메일을 무시하세요. <br/> 회원님의 비밀번호는 변경되지 않습니다.`,
        };
        return knex('users')
          .where({ username })
          .first()
          .update({
            resetPasswordToken: token,
            resetPasswordExpires: inOneHour,
          })
          .then(() => {
            sendEmail(mailOptions)
              .then(() => {
                res.status(201).send();
              })
              .catch(err => {
                res.status(500).json(err);
                next(err);
              });
          })
          .catch(err => {
            res.status(500).json(err);
            next(err);
          });
      }
      return res.status(409).json('Can not find user email');
    })
    .catch(err => {
      res.status(409).json('Can not find user email');
      next(err);
    });
};
