var User = require('../models/user');
var mongoose = require('mongoose');
var Contract = require('../models/wellnesscontract')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.write('fdsa');
  console.log(req);
  if (req.message) {
    console.log('FDS');
  }
});

router.post('/createContract', function(req, res) {
  var toCreate = new Contract();
  toCreate.participants = [ req.user._id, mongoose.Types.ObjectId(req.body.friend)]


  toCreate.save(); // or toCreate.update()
})

router.get('/getWCTasks', function(req, res, next) {
  Task.find({"_id": {$in : req.user.tasks}}, function(err, user){
    res.json(user)
  })
})

//get friends
router.get('/getFriends', (req, res) => {
  User.findById(mongoose.Types.ObjectId('5ec99751669c6f7e415ba95e'), function (err, user) {
    res.json(user.friends);
    console.log(user.friends);
  });
});



module.exports = router;
