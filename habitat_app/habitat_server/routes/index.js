var express = require('express');
var router = express.Router();
var Task = require('../models/task')
var mongoose = require('mongoose')
var User = require('../models/user')
var Contract = require('../models/wellnesscontract')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.write('fdsa');
  console.log(req);
  if (req.message) {
    console.log('FDS');
  }
});

router.get('/myTask', function(req,res) {
  Task.find({"_id" : {$in : req.user.tasks}}, function(err, user){


      res.json(user)
  })
});

router.get('/tasksInContract', function(req,res) {
  Contract.findOne({"_id" : {$in : req.user.contracts}}, function(err, data){

      console.log(data)
      res.json(data)
  })
});

router.post('/sendRewards', function(req,res){

  var cash = req.body.points;
  var happinesss = Math.floor(req.body.points)
  console.log(cash)
  User.updateOne({'_id': req.user._id}, {$inc : {"credits" : cash}}, function(err, data){
    if(err)
    console.log(err);
    else{

      console.log(data.credits)
      res.json(data)
    }
  });
})

router.delete('/deleteTask', function(req,res){

    
    var id = mongoose.Types.ObjectId(req.body.my_id)
    console.log(id)
    
    Task.findByIdAndRemove(id, function(err, task){
      if(err)
      console.log(err)
      else{
        res.send("Success")
      }
    })

    User.updateOne({'_id': req.user._id}, {$pull : {"tasks" : id}}, function(err,user){
      if(err)
        console.log(err)
    })
    
    
});


module.exports = router;
