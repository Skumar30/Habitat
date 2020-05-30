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
    var result = await ContractModel.findByIdAndUpdate(req.body.contractId, {
      tasks: req.body.tasks
    });
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
