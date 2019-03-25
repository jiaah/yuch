const router = require('express').Router();
// const jwt = require('jsonwebtoken');
const passport = require('../auth/local');
const authHelpers = require('../auth/_helpers');
// const JSONWEBTOKEN_KEY = require('../../secrets/jstoken_config')
//   .JSONWEBTOKEN_KEY;

module.exports = () => {
  router.post('/register', authHelpers.loginRedirect, (req, res, next) =>
    authHelpers
      .createUser(req, res)
      .then(response => {
        passport.authenticate('local', (err, user, info) => {
          if (user) {
            res.status(200).json({ username });
          }
        })(req, res, next);
      })
      .catch(err => {
        res.status(500).json('error');
      }),
  );

  router.post(
    '/login',
    authHelpers.loginRedirect,
    passport.authenticate(
      'local',
      {
        // successRedirect: '/user',
        failureRedirect: '/login',
      },
      // (err, user, info) => {
      //   if (err) {
      //     res.status(500).json('error');
      //   }
      //   if (!user) {
      //     res.status(401).json('User not found');
      //   }
      //   if (user) {
      //     req.logIn(user, { session: false }, err => {
      //       if (err) {
      //         res.status(500).json('error');
      //       }
      //       // generate a signed son web token with the contents of user object and return it in the response
      //       // const token = jwt.sign(user, JSONWEBTOKEN_KEY);
      //       res.status(201).json(req.user);

      //       // res.redirect('/');
      //     });
      //   }
      // },
      // )(req, res, next);
    ),
    (req, res) => {
      console.log('Cookie-Session /login: ', req.session); // {}
      console.log('Req Object /login: ', req.user); // null
      res.redirect(`/success?username=${req.user.username}`);
    },
  );

  router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
    req.logout();
    res.redirect('/login');

    console.log('Cookie-Session /logout: ', req.session); // {}
    console.log('Req Object /logout: ', req.user); // null
  });

  router.get('/current-user', (req, res) => {
    console.log('COOKIE-SESSION: ', req.session);
    res.send(req.user);
  });

  return router;
};

/*
[ AUTH ]
Request
-> Cookie-Session (Extract cookie data)
-> Passport (Pulls user id out of cookie data)
-> Deserialize User (Turn user id into a user)
-> user is added to req object as req.user
*/
