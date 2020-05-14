var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    return done(err, user);
  });
});

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      User.findOne({username: username}, function (err, user) {
        if (err) {
          return done(err, {message: 'Error with database'});
        }
        if (user) {
          return done(null, false, {message: 'Username is already in use'});
        }

        var newUser = new User();
        newUser.name = req.body.name;
        newUser.username = username;
        newUser.email = req.body.email;
        newUser.password = password;
        newUser.friends = [];
        newUser.contracts = [];
        newUser.tasks = [];
        newUser.pets = [];
        newUser.cosmetics = [];
        newUser.save(function (error, result) {
          if (error) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({username: username}, function (err, user) {
        if (err) {
          return done(err, {message: 'Error with database'});
        }
        if (!user) {
          return done(null, false, {message: 'Username not found'});
        }

        if (user.password !== password) {
          //  console.log(user.password);
          return done(null, false, {message: 'Incorrect Password'});
        }
        return done(null, user);
      });
    }
  )
);
