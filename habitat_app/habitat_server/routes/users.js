var express = require('express');
var router = express.Router();
var passport = require('passport');
var Pet = require('../models/pet');
var User = require('../models/user');

router.post(
  '/signup',
  passport.authenticate('local.signup', {
    failureRedirect: '/users/signup',
    failureFlash: true
  }),
  function (req, res) {
    console.log(req.user);
    var defaultPet = new Pet();

    defaultPet.happiness = 100;
    defaultPet.name = 'Beary';
    defaultPet.type = 'bear';
    defaultPet.cosmetics = [];
    defaultPet.save(function (error, pet) {
      if (error) {
        res.json({message: 'Default Pet Error'});
      }

      User.findByIdAndUpdate(req.user._id, {pet_id: pet._id}, function (err) {
        if (err) {
          res.json({message: "Could not update user's pet id"});
        }
        req.user.pet_id = pet._id;
        res.json(req.user);
      });
    });
  }
);

router.get('/signup', function (req, res) {
  var array_length = req.session.flash.error.length;
  var message = req.session.flash.error[array_length - 1];
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
  var array_length = req.session.flash.error.length;
  var message = req.session.flash.error[array_length - 1];
  req.session.flash.error = [];
  res.json({message: message});
});

module.exports = router;
