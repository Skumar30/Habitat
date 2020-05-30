var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = require('../models/user')

/*Friend Screen*/
router.get('/friends', (req, res) => {
    User.find({"_id" : {$in: req.user.friends}}, function(err, user){
      res.json(user);
      console.log(user);
    })
  });
  
  router.post('/addFriend', (req, res) => {
    console.log("FriendUSRNM: " + req.body.friend_username);
    var userName = req.body.friend_username
  
    User.findOneAndUpdate({username: userName}, { $push: { friends: req.user._id }}, function(err, resultFriend) {
      if (err) {
        console.log("Error: " + err);
  
      } else {
        if (resultFriend == null) {
          console.log("NULL FIND");
          res.json(resultFriend);
          return
        }
        console.log("FriendId: " + resultFriend._id);
        
        User.findByIdAndUpdate(req.user._id, { $push: { friends: resultFriend._id }}, function(err, result){
          console.log("EndResult(Curr): " + result.name);
        });
  
        console.log("Else: " + resultFriend);
  
        res.json(resultFriend);
      }
    });
  });
  
  router.post('/deleteFriend', (req, res) => {
    var id = mongoose.Types.ObjectId(req.body.friend_id)
    console.log("Friend: " + id);
    User.findByIdAndUpdate(id, { $pull: { friends: req.user._id }}, function(err, result){
      console.log("EndResult(Friend): " + result.name);
    });
  
    User.findByIdAndUpdate(req.user._id, { $pull: { friends: id }}, function(err, result){
      console.log("EndResult(Curr): " + result.name);
      res.json(result);
    });
    
  });
  
  router.post('/getFriendData', (req, res) => {
    console.log(req.body.friend_id)
    var id = mongoose.Types.ObjectId(req.body.friend_id)
    User.findById(id, function(err, user){
      res.json(user);
      console.log(user);
    })
  })

  router.get('/getUsername', (req, res) => {
    res.json(req.user.username)
  });

  module.exports = router;