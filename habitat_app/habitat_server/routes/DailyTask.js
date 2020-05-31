var express = require('express');
var router = express.Router();
var Task = require('../models/task')
var mongoose = require('mongoose')
var User = require('../models/user')
var Contract = require('../models/wellnesscontract')
var Pet = require('../models/pet')
var Cosmetic = require('../models/cosmetic');
const MongoClient = require('mongodb').MongoClient;
const BASE_DAILY_REWARD = 10;
const WELLNESS_BONUS = 1.5;
const MAX_HAPPINESS_BONUS = 100;
  
  router.get('/getDailies', async(req, res, next) => {
    try {
      var UserModel = require('../models/user.js');
      var TaskModel = require('../models/task.js');
  
      // Daily Tasks to return
      var tasks = [];
      //console.log('entering loop');
      //console.log (req.user.tasks);
      // Find the tasks matching id
      TaskModel.find({"_id": {$in: req.user.tasks}}, function (err, result) {
        for ( var i = 0; i < result.length; i++) {
          if (result[i].daily) {
            tasks.push(result[i]);
            //console.log(tasks);
          }
        }
        //console.log("above return");
        res.json(tasks);
        console.log(tasks);
      });
      }
      catch (err) {
      console.log("error getting dailies");
      console.log(err);
      res.status(500).send(err);
    }
  });
  
  router.get('/getContract', async(req,res, next) => {
      var ContractModel = require('../models/wellnesscontract.js');
      ContractModel.findOne({"_id" : {$in : req.user.contracts}}, function(err, data){
      console.log("inside contract");
      console.log(data);
      res.json(data);
    })
  });

  router.post('/incrementStreak', async(req, res, next) => {
    try{
      var UserModel = require('../models/user.js');
      var PetModel = require('../models/pet.js');
      var TaskModel = require('../models/task.js');
  
      var user = await UserModel.findOne({_id: req.user._id});
      var task = await TaskModel.findOne({_id: req.body.id});
      var pet = await PetModel.findOne({_id: req.user.pet_id});
      var streak = req.body.streak
      var streak_bonus = streak;
      if( streak_bonus >= 50){
        streak_bonus = 50;
      }
  
      var contract = req.body.inContract;
      var wellness_bonus = 1;
      if( contract == true){
        wellness_bonus = WELLNESS_BONUS;
      }
  
      console.log("in increment");
      console.log(task);
  
      // Daily Task reward + streak bonus + Wellness_Bonus
      var rewards = Math.floor((BASE_DAILY_REWARD + streak_bonus) * wellness_bonus);
  
      // Happiness Bonus for Max Happiness
      var updatedHappiness = pet.happiness + rewards;
      var happiness_bonus = 0;
      if( updatedHappiness >= 100 && pet.happiness < 100){
        happiness_bonus = MAX_HAPPINESS_BONUS;
        updatedHappiness = 100;
      }
      var updatedCredits = user.credits + rewards + happiness_bonus;
  
      var result = await UserModel.updateOne(
          { _id: req.user._id },
          { credits: updatedCredits }
      );
  
      var result2 = await PetModel.updateOne(
          {_id: req.user.pet_id},
          {happiness: updatedHappiness}
      );
  
      var result3 = await TaskModel.updateOne(
          { _id: req.body.id },
          { streak: streak }
      );
  
      //res.json(result);
      res.json(result3);
    }
    catch (err) {
      console.log("error giving rewards");
      res.status(500).send(err);
    }
  });
  
  router.post('/decrementStreak', async(req, res, next) => {
    try{
      var UserModel = require('../models/user.js');
      var PetModel = require('../models/pet.js');
      var TaskModel = require('../models/task.js');
      var ContractModel = require('../models/wellnesscontract.js');
  
      var user = await UserModel.findOne({_id: req.user._id});
      var task = await TaskModel.findOne({_id: req.body.id});
      var pet = await PetModel.findOne({_id: req.user.pet_id});
      var streak = req.body.streak + 1;
      var streak_bonus = streak;
      if( streak_bonus >= 50){
        streak_bonus = 50;
      }
  
      var contract = req.body.inContract;
      var wellness_bonus = 1;
      if( contract == true){
        wellness_bonus = WELLNESS_BONUS;
      }
  
      // Daily Task reward + streak bonus + Wellness_Bonus
      var rewards = Math.floor((BASE_DAILY_REWARD + streak_bonus) * wellness_bonus);
  
      // Happiness Bonus for Max Happiness
      var updatedHappiness = pet.happiness - rewards;
      var happiness_bonus = 0;
      if( pet.happiness >= 100 && updatedHappiness < 100){
        happiness_bonus = MAX_HAPPINESS_BONUS;
      }
      var updatedCredits = user.credits - rewards - happiness_bonus;
  
      var result = await UserModel.updateOne(
          { _id: req.user._id },
          { credits: updatedCredits }
      );
  
      var result2 = await PetModel.updateOne(
          {_id: req.user.pet_id},
          {happiness: updatedHappiness}
      );
  
      var result3 = await TaskModel.updateOne(
          { _id: task },
          { streak: req.body.streak }
      );
  
      res.json(result);
    }
    catch (err) {
      console.log("error giving rewards");
      res.status(500).send(err);
    }
  });
  
  router.post('/complete', async(req, res, next) => {
    try{
      var TaskModel = require('../models/task.js');
      console.log(new Date());
      var result = await TaskModel.updateOne({_id: req.body.id}, { $push: {datesCompleted: req.body.date}});
      res.json(result);
    }
    catch (err){
      console.log("error completing");
      res.status(500).send(err);
    }
  });
  
  router.post('/incomplete', async(req, res, next) => {
    try{
      var TaskModel = require('../models/task.js');
      var result = await TaskModel.updateOne({_id: req.body.id}, { $pop: {datesCompleted: 1}});
      res.json(result);
    }
    catch (err){
      console.log("error completing");
      res.status(500).send(err);
    }
  });
  
  router.post('/updateStreak', async(req, res, next) => {
    try{
      var TaskModel = require('../models/task.js');
      var result = await TaskModel.updateOne(
          { _id: req.body.id },
          { streak: req.body.streak }
      );
      res.json(result);
    }
    catch (err){
      console.log("error updating streaks");
      res.status(500).send(err);
    }
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
    
      router.post('/addReward', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var PetModel = require('../models/pet.js');
    var TaskModel = require('../models/task.js');
    var ContractModel = require('../models/wellnesscontract.js');


    //adding credits to user
    var user = await UserModel.findOne({_id: req.user._id});
    var task = await TaskModel.findOne({_id: req.body.taskId});

    //adding today as list of dates for datesCompleted
    var markAsComplete = await TaskModel.updateOne({_id: req.body.taskId}, { $push: {datesCompleted: new Date()}});

    var updatedCredits;
    if(task.daily) {
      updatedCredits = user.credits + Math.floor((10 + task.streak) * 1.5);
      var streakUpdate = await TaskModel.updateOne({_id: req.body.taskId}, {streak: task.streak + 1});
    }
    else {
      updatedCredits = user.credits + 45;
    }

    //updating pet's happiness
    var pet = await PetModel.findOne({_id: req.user.pet_id});

    var updatedHappiness;
    if(task.daily) {
      var temp = (1.5 * ((10 + task.streak) / 10));

      updatedHappiness = pet.happiness + temp;
    }
    else {
      updatedHappiness = pet.happiness + 4; //floored to 4
    }

    //happiness can be a max of 100
    if(updatedHappiness > 100)
      updatedHappiness = 100;

    var result2 = await PetModel.updateOne(
        {_id: req.user.pet_id},
        {happiness: (updatedHappiness)}
    );

    //calculating percent task completion bonus
    var contractId = req.body.contractId;
    contractId instanceof mongoose.Types.ObjectId;
    var contract = await ContractModel.findOne({_id: contractId});
    var bonus = Math.floor((1 / contract.tasks.length) * 100);

    //updating user credits
    var totalCredits = updatedCredits + bonus;
    var result = await UserModel.updateOne(
        { _id: req.user._id },
        { credits: (totalCredits) }
    );

    //adding bonus to other user
    var otherUser;
    if(req.user._id.equals(contract.participants[0]))
      otherUser = await UserModel.findOne({_id: contract.participants[1]});
    else {
      otherUser = await UserModel.findOne({_id: contract.participants[0]});
    }

    //updating other user credits
    var otherUserBonus = otherUser.credits + bonus;
    var otherResult = await UserModel.updateOne({_id: otherUser.id}, {credits: (otherUserBonus)});
    var otherUserPet = await PetModel.findOne({_id: otherUser.pet_id});
    var otherUserHappiness = otherUserPet.happiness + Math.floor(bonus / 10);
    otherResult = await PetModel.updateOne({_id: otherUser.pet_id}, {happiness: (otherUserHappiness)});

    res.send(result);
  }
  catch(err) {

    console.log(err);
    res.status(500).send(err);
  }
});

  router.post('/removeReward', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var PetModel = require('../models/pet.js');
    var TaskModel = require('../models/task.js');
    var ContractModel = require('../models/wellnesscontract.js');

    var user = await UserModel.findOne({_id: req.user._id});
    var task = await TaskModel.findOne({_id: req.body.taskId});

    //removes last date
    var lastCompletion = task.datesCompleted[task.datesCompleted.length - 1];
    var markAsIncomplete = await TaskModel.updateOne({_id: req.body.taskId}, { $pull: {datesCompleted: lastCompletion}});

    //calculating credits to remove from user
    var updatedCredits;
    if(task.daily) {
      updatedCredits = user.credits - Math.floor((10 + task.streak - 1) * 1.5);
      var streakUpdate = await TaskModel.updateOne({_id: req.body.taskId}, {streak: task.streak - 1});
    }
    else {
      updatedCredits = user.credits - 45;
    }

    var result = await UserModel.updateOne(
        { _id: req.user._id },
        { credits: (updatedCredits) }
    );

    //updating pet's happiness
    var pet = await PetModel.findOne({_id: req.user.pet_id});
    var updatedHappiness;
    if(task.daily) {
      var temp = 1.5 * ((10 + task.streak) / 10);
      updatedHappiness = pet.happiness - temp;
    }
    else {
      updatedHappiness = pet.happiness - 3;
    }

    //happiness can be a min of 0
    if(updatedHappiness < 0)
      updatedHappiness = 0;

    var result2 = await PetModel.updateOne(
        {_id: req.user.pet_id},
        {happiness: (updatedHappiness)}
    );

    //calculating bonus to remove
    var contractId = req.body.contractId;
    contractId instanceof mongoose.Types.ObjectId;
    var contract = await ContractModel.findOne({_id: contractId});
    var bonus = Math.floor(1 / contract.tasks.length * 100);

    var totalCredits = updatedCredits - bonus;
    var result = await UserModel.updateOne(
        { _id: req.user._id },
        { credits: (totalCredits) }
    );

    //removing bonus to other user
    var otherUser;
    if(req.user._id.equals(contract.participants[0]))
      otherUser = await UserModel.findOne({_id: contract.participants[1]});
    else {
      otherUser = await UserModel.findOne({_id: contract.participants[0]});
    }

    var otherUserBonus = otherUser.credits - bonus;
    var otherResult = await UserModel.updateOne({_id: otherUser.id}, {credits: (otherUserBonus)});
    var otherUserPet = await PetModel.findOne({_id: otherUser.pet_id});
    var otherUserHappiness = otherUserPet.happiness - Math.floor(bonus / 10);
    otherResult = await PetModel.updateOne({_id: otherUser.pet_id}, {happiness: (otherUserHappiness)});

    res.send(result);
  }
  catch(err) {

    console.log(err);
    res.status(500).send(err);
  }
});
  
  module.exports = router;
