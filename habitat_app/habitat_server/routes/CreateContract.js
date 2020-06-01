var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var UserModel = require('../models/user');
var ContractModel = require('../models/wellnesscontract');
var Task = require('../models/task');

router.post('/createContract', async (req, res, next) => {
  try {
    var contractToCreate = new ContractModel(req.body);
    contractToCreate.participants = [
      req.user._id,
      mongoose.Types.ObjectId(req.body.friend)
    ];
    contractToCreate.owner = req.user._id;
    contractToCreate.pending = true;
    var result = await contractToCreate.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/getTasks', (req, res) => {
  Task.find({_id: {$in: req.user.tasks}}, function (err, user) {
    res.json(user);
    console.log(user);
  });
});

//get friends
router.get('/getFriends', (req, res) => {
  console.log('hi');
  UserModel.find({_id: {$in: req.user.friends}}, function (err, user) {
    res.json(user);
    console.log(user);
  });
});

router.post('/addContract', async (req, res, next) => {

  try {
    var result = await UserModel.update(
      {_id: req.user._id},
      {$push: {contracts: mongoose.Types.ObjectId(req.body.contractId)}}
    );

    res.send(result);
  } catch (err) {
    console.log('error adding contract');
    res.status(500).send(err);
  }
});

router.post('/addContractToFriend', async (req, res, next) => {
  try {
    var result = await UserModel.update(
      {_id: req.body.friendID},
      {$push: {contracts: mongoose.Types.ObjectId(req.body.contractId)}}
    );

    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/updateContract', async (req, res, next) => {
  try {

    var contractId = req.body.contractId;
    contractId instanceof mongoose.Types.ObjectId;
    for(var i = 0; i < req.body.tasks.length; i++) {
      var tempId = req.body.tasks[i];
      tempId instanceof mongoose.Types.ObjectId;
      var findResult = await ContractModel.findOne({_id: contractId}, {tasks: tempId});
      if(findResult == null) { //if not already in contract add it
        var addResult = await ContractModel.updateOne({_id: contractId}, { $push: {
          tasks: tempId}});
      }
    }


    for(var i = 0; i < req.body.tasksToRemove.length; i++) {
      var tempId = req.body.tasksToRemove[i];
      tempId instanceof mongoose.Types.ObjectId;
      var myTaskResult = await UserModel.findOne({_id: req.user._id}, {tasks: tempId});
      console.log("myTaskResult: " + myTaskResult);
      var findResult = await ContractModel.findOne({_id: contractId}, {tasks: tempId});
      console.log("findResult: " + findResult);
      if(myTaskResult != null && findResult != null) { //if it is my task and my task is in contract, remove it
        var removeResult = await ContractModel.updateOne({_id: contractId}, { $pull: {
          tasks: tempId}});
      }
    }

    var empty = [];
    res.send(empty);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
