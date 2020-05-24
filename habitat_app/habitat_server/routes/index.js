var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.write('fdsa');
  console.log(req);
  if (req.message) {
    console.log('FDS');
  }
});

router.get('/getTheirTasks', async(req, res, next) => {
  try {
    //reference to user and contract model
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');
    var TaskModel = require('../models/task.js');

    //getting contract from passed in query id
    var currContract = await ContractModel.findOne({_id: req.query.id});

    //given this contract, return a list of the users tasks and a list of the other user's tasks
    var currContractTaskIds = currContract.tasks;
    var userTaskIds = req.user.tasks;
    var theirTasks = [];

    //iterating through each task id in the contract
    for (var i = 0; i < currContractTaskIds.length; i++) {

      //current task id
      var currTaskId = currContractTaskIds[i];

      //to represent whether or not the current task is one of the user's tasks or the other user's tasks
      var myTask = false;

      //iterating through all of the user's task ids to find the current task
      for(var j = 0; j < userTaskIds.length; j++) {

        //if the current task is found within user's task id list
        if(currTaskId.equals(userTaskIds[j])) {

          myTask = true;
          break;
        }
      }

      if(!myTask) {
        var currTask = await TaskModel.findOne({_id: currTaskId});
        var due_date = currTask.due_date.toString().substring(0, 15);
        theirTasks.push({"title": currTask.title, "due_date": due_date, "id": currTaskId});
      }
    }

    //returning whether or not the user is currently in a wellness contract
    res.send(theirTasks);
  }
  catch(err) {

    console.log("error getting their tasks");
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/getMyTasks', async(req, res, next) => {
  try {
    //reference to user and contract model
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');
    var TaskModel = require('../models/task.js');

    //getting contract from passed in query id
    var currContract = await ContractModel.findOne({_id: req.query.id});

    //given this contract, return a list of the users tasks and a list of the other user's tasks
    var currContractTaskIds = currContract.tasks;
    var userTaskIds = req.user.tasks;
    var myTasks = [];

    //iterating through each task id in the contract
    for (var i = 0; i < currContractTaskIds.length; i++) {

      //current task id
      var currTaskId = currContractTaskIds[i];

      //iterating through all of the user's task ids to find the current task
      for(var j = 0; j < userTaskIds.length; j++) {

        //if the current task is found within user's task id list
        if(currTaskId.equals(userTaskIds[j])) {

          //get the actual task from the current task id
          var currTask = await TaskModel.findOne({_id: currTaskId});
          var due_date = currTask.due_date.toString().substring(0, 15);
          console.log("due date is: " + currTask.due_date);
          myTasks.push({"title": currTask.title, "due_date": due_date, "id": currTaskId});
        }
      }
    }

    //returning whether or not the user is currently in a wellness contract
    res.send(myTasks);
  }
  catch(err) {

    console.log("error getting my tasks");
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/checkCurrentContract', async(req, res, next) => {
  try {
    //reference to user and contract model
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');


    //list of all the contract ids that the user has been invited to/invited others to
    var userContractIds = req.user.contracts;

    var result = [];
    //iterating through all contract ids for the user
    for (var i = 0; i < userContractIds.length; i++) {

      var currContractId = userContractIds[i];

      //getting the actual contract object from the contract id
      var currContract = await ContractModel.findOne( {_id: currContractId});

      //if the current contract is not pending
      if(!currContract.pending)
        result.push(currContractId);
    }

    //returning whether or not the user is currently in a wellness contract
    res.send(result);
  }
  catch(err) {

    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/getPendingContracts', async(req, res, next) => {
  try {
    //reference to user and contract model
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');

    //list of all the contract ids that the user has been invited to/invited others to
    var userContractIds = req.user.contracts;

    //a list of pending contracts including owner and due date to return
    var pendingContracts = [];

    //iterating through all contract ids for the user
    for (var i = 0; i < userContractIds.length; i++) {

      var currContractId = userContractIds[i];

      //getting the actual contract object from the contract id
      var currContract = await ContractModel.findOne( {_id: currContractId});

      //if the current contract is pending and the owner is not the user
      if(currContract.pending && !currContract.owner.equals(req.user._id)) {

        var owner = await UserModel.findOne( {_id: currContract.owner});
        //console.log("owner is: " + owner.username);
        //add owner name and due date to return list
        var due_date = currContract.due_date.toString().substring(0, 15);
        pendingContracts.push({"owner": owner.username, "due_date": due_date, "id": currContractId});
      }
    }

    //returning list of pending contracts with info
    res.send(pendingContracts);
  }
  catch(err) {

    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/createTask', async(req, res, next) => {

  try {
    var TaskModel = require('../models/task.js');
    var taskToCreate = new TaskModel(req.body);

    var result = await taskToCreate.save();
    res.send(result);
  }
  catch(err) {

    console.log("error when creating task");
    res.status(500).send(err);
  }


});

router.post('/addTask', async(req, res, next) => {

  try {
    var User = require('../models/user.js');

    var userId = req.user._id;

    var taskId = req.body.taskId;
    taskId instanceof mongoose.Types.ObjectId;

    var result = await User.update(
        { _id: userId },
        { $push: { tasks: taskId } }
    );
    res.send(result);
  }
  catch(err) {

    console.log(err);
    res.status(500).send(err);
  }


});

router.post('/createContract', async(req, res, next) => {

  try {
    var ContractModel = require('../models/wellnesscontract.js');
    var contractToCreate = new ContractModel(req.body);
    var result = await contractToCreate.save();
    res.send(result);
  }
  catch(err) {

    console.log("error creating contract");
    res.status(500).send(err);
  }


});

router.post('/addContract', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');

    //console.log("userId is: " + req.user._id);
    //console.log("contractId is: " + req.body.contractId);
    //var Model = mongoose.model("model", schema, "users");
    var result = await UserModel.update(
        { _id: req.user._id },
        { $push: { contracts: req.body.contractId } }
    );
    res.send(result);
  }
  catch(err) {

    console.log("error adding contract");
    res.status(500).send(err);
  }


});

router.post('/removeContract', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');

    //removing the contract from the user's contract field
    var result = await UserModel.update(
        { _id: req.user._id },
        { $pull: { contracts: req.body.contractId } }
    );

    var currContract = await ContractModel.findOne({_id: req.body.contractId});

    //removing the contract from the other user's contract field
    if(currContract.participants[0].equals(req.user._id)) {
      var temp = await UserModel.update(
        {_id: currContract.participants[1]},
        { $pull: { contracts: req.body.contractId } }
      );
    }
    else {
      var temp = await UserModel.update(
        {_id: currContract.participants[0]},
        { $pull: { contracts: req.body.contractId } }
      );
    }

    var finalResult = await ContractModel.deleteOne({_id: req.body.contractId});

    res.send(finalResult);
  }
  catch(err) {

    console.log("error removing contract");
    res.status(500).send(err);
  }


});

router.get('/updateContracts', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');

    //getting user from userId
    var user = await UserModel.findOne({ _id: req.user._id });

    var contractsToRemove = [];
    var currentTime = new Date();

    for(var i = 0; i < user.contracts.length; i++) {

      var currentContract = await ContractModel.findOne({_id: user.contracts[i]});
      if(currentTime > currentContract.due_date) {
        contractsToRemove.push(user.contracts[i]);
      }
    }

    res.send(contractsToRemove);
  }
  catch(err) {

    console.log("error removing contract");
    res.status(500).send(err);
  }
});

module.exports = router;
