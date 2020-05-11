var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/signup', passport.authenticate('local.signup'), function (req, res) {
  console.log(req.user);
});

module.exports = router;
