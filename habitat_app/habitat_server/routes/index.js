var express = require('express');
var router = express.Router();

var User = require('../models/user');

var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
//mongoose.connect('mongomongodb+srv://evanscales:123456789@cluster0-zv2fa.mongodb.net/test?retryWrites=true&w=majoritydb://localhost/test', {useNewUrlParser: true});

//var currentUser = '5ec99712669c6f7e415ba95d';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.write('fdsa');
  console.log(req);
  if (req.message) {
    console.log('FDS');
  }
});

router.get('/friends', (req, res) => {
  User.find({"_id" : {$in: req.user.friends}}, function(err, user){
    res.json(user);
    console.log(user);
  })
});

router.post('/addFriend', (req, res) => {
  //await Model.findOneAndUpdate({ foo: 'bar' }, { name: 'test' }).orFail(() => Error('Not found'));
  
  var id = mongoose.Types.ObjectId(req.body.friend_id)
  console.log("Friend: " + id);
  User.findByIdAndUpdate(id, { $set: { friends: req.user._id }}, function(err, result) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Else: " + result);
      res.json(result);
    }
  });
});



/*
router.get('/name', (req, res) => {
  User.findById(req.user, function (err, user) {
    res.json(user.name);
    console.log(user.name);
  });*/

module.exports = router;
