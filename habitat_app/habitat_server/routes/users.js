var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post(
  '/signup',
  passport.authenticate('local.signup', {
    failureRedirect: '/users/signup',
    failureFlash: true
  }),
  function (req, res) {
    console.log(req.user);
    res.json(req.user);
  }
);

router.get('/signup', function (req, res) {
  array_length = req.session.flash.error.length;
  message = req.session.flash.error[array_length - 1];
  req.session.flash.error = [];
  res.json({message: message});
});

router.post(
  '/signin',
  passport.authenticate('local.signin', {
    failureRedirect: '/users/signin',
    failureFlash: true
  }),
  function (req, res) {
    console.log(req.user);
    res.json(req.user);
  }
);

router.get('/signin', function (req, res) {
  array_length = req.session.flash.error.length;
  message = req.session.flash.error[array_length - 1];
  req.session.flash.error = [];
  res.json({message: message});
});

module.exports = router;
