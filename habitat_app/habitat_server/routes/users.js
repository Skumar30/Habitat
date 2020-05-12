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
    if (req.user) {
      if (req.session.flash && req.session.flash.error) {
        req.session.flash.error = [];
      }
      res.json(req.user);
    }
  }
);

router.get('/signup', function (req, res) {
  let arraylength = req.session.flash.error.length;
  let message = req.session.flash.error[arraylength - 1];
  req.session.flash.error = [];
  res.json({message: message});
});

module.exports = router;
