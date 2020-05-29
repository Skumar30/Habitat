var express = require('express');
var router = express.Router();
var Task = require('../models/task')
var mongoose = require('mongoose')
var User = require('../models/user')
var Contract = require('../models/wellnesscontract')
var Pet = require('../models/pet')
var Cosmetic = require('../models/cosmetic');
const MongoClient = require('mongodb').MongoClient;

/*RegTask Requests */
router.get('/myTask', async (req, res, next) => {

    Task.find({"_id" : {$in : req.user.tasks}}, function(err, user){
  
        console.log(user)
        res.json(user)
    })
  
  
  });
  
  router.get('/tasksInContract', function(req,res) {
    Contract.findOne({"_id" : {$in : req.user.contracts}}, function(err, data){
  
        console.log(data)
        res.json(data)
    })
  });
  
  router.post('/sendCash', function(req,res){
  
      var cash = req.body.points;
      var happinesss = Math.floor(req.body.points/10)
      console.log(cash)
      User.updateOne({'_id': req.user._id}, {$inc : {"credits" : cash}}, function(err, data){
        if(err)
        console.log(err)
        else{
          res.send("Success")
        }
      })
    
    
    
    });
    
  router.post('/taskCompleted', function(req, res){
      console.log(req.body.complete, req.body.date)
      var task_id = mongoose.Types.ObjectId(req.body.task_id)
    
      if(req.body.complete){
        Task.updateOne({'_id': task_id}, {$push : {'datesCompleted': req.body.date}}, function(err,data){
         if(err)
         console.log(err)
         else
         res.send("Success Pushed")
        })
      }
      else{
    
        if(req.body.oneTimeOnly){
          Task.updateOne({'_id': task_id}, {'datesCompleted': []}, function(err,data){
            if(err)
            console.log(err)
            else
            res.send("Success Pulled")
           })
        }
        else{
        Task.updateOne({'_id': task_id}, {$pull : {'datesCompleted': req.body.date}}, function(err,data){
          if(err)
          console.log(err)
          else
          res.send("Success Pulled")
         })
        }
      }
    
    })
    
  router.post('/sendHappiness', function(req,res){
    
      var cash = req.body.points;
      var happiness = Math.floor(req.body.points/10)
      console.log(cash)
      Pet.updateOne({'_id': req.user.pet_id}, {$inc : {'happiness' : happiness}}, function(err,data){
        if(err)
          console.log(err)
          else{
            res.send("Success")
          }
      })
    
    
    
    });
    
    
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
  