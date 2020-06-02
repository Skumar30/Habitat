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

router.post('/updateTasks', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');
    var TaskModel = require('../models/task.js');

    //getting user from userId
    var user = await UserModel.findOne({ _id: req.user._id });


    //current contract user is in
    var contractId = req.body.contractId;
    contractId instanceof mongoose.Types.ObjectId;
    console.log("contractId: " + contractId);
    var currentContract = await ContractModel.findOne({_id: contractId});

    //other user object
    var otherUser;
    if(req.user._id.equals(currentContract.participants[0]))
      otherUser = await UserModel.findOne(currentContract.participants[1]);
    else {
      otherUser = await UserModel.findOne(currentContract.participants[0]);
    }

    //possible tasks which need to be removed from the contract because they have expired or deleted
    var tasksToRemove = [];
    var currentTime = new Date();

    //first check if the task that is in the contract is still within the user's list of tasks
    for(var i = 0; i < currentContract.tasks.length; i++) {

      var currTask = await TaskModel.findOne({_id: currentContract.tasks[i]});
      var validTask = false;

      if(currTask != null) {
        if(currentTime <= currTask.due_date) {

          //iterating though all the user's tasks to make sure task is still in user's task field
          for(var k = 0; k < user.tasks.length; k++) {

            //if task matches one of the tasks in the user
            if(currTask._id.equals(user.tasks[k])) {
              validTask = true;
              break;
            }
          }

          //iterating through all the other users's tasks
          for(var k = 0; k < otherUser.tasks.length; k++) {

            //if task matches one of the tasks in the user
            if(currTask._id.equals(otherUser.tasks[k])) {
              validTask = true;
              break;
            }
          }
        }
      }

      //if the task is not valid, add it to the list of tasks to remove
      if(!validTask) {

        //get rid of task in contractToCreate
        var removeContract = await ContractModel.updateOne({_id: currentContract._id}, { $pull: {tasks: currentContract.tasks[i]}});

        //get rid of task from user field, call remove for both, 1 will call 500 error but should be fine
    
        var findUser = await UserModel.findOne({
          _id: {$eq: user._id},
          tasks: {$eq: currentContract.tasks[i]}
        });

        if(findUser != null) {

          var removeUser = await UserModel.updateOne({_id: user._id}, { $pull: {tasks: currentContract.tasks[i]}});
        }
        else {
          var removeOtherUser = await UserModel.updateOne({_id: otherUser._id}, { $pull: {tasks: currentContract.tasks[i]}});
        }

        //delete task from task model
        var removeTask = await TaskModel.deleteOne({_id: currentContract.tasks[i]});
      }
    }

    res.send(tasksToRemove);
  }
  catch(err) {

    console.log("error updating tasks");
    console.log(err);
    res.status(500).send(err);
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
        theirTasks.push({_id: currTaskId, frequency: currTask.frequency, datesCompleted: currTask.datesCompleted,
            title: currTask.title, due_date: currTask.due_date, daily: currTask.daily, start_date: currTask.start_date,
            streak: currTask.streak
          }
        );
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

          myTasks.push({_id: currTaskId, frequency: currTask.frequency, datesCompleted: currTask.datesCompleted,
              title: currTask.title, due_date: currTask.due_date, daily: currTask.daily, start_date: currTask.start_date,
              streak: currTask.streak
            }
          );
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

router.post('/updateContracts', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');

    //getting user from userId
    var user = await UserModel.findOne({ _id: req.user._id });

    var contractsToRemove = [];
    var currentTime = new Date();

    for(var i = 0; i < user.contracts.length; i++) {

      var validContract = false;
      var currentContract = await ContractModel.findOne({_id: user.contracts[i]});
      if(currentContract != null && currentTime < currentContract.due_date) {

        validContract = true;
      }
      else {

        //other user
        var otherUser;
        if(req.user._id.equals(currentContract.participants[0]))
          otherUser = await UserModel.findOne({_id: currentContract.participants[1]});
        else {
          otherUser = await UserModel.findOne({_id: currentContract.participants[0]});
        }

        //removing contract from user field
        var removeUser = await UserModel.updateOne({_id: req.user._id}, {$pull: {contracts: user.contracts[i]}})

        //removing contract from other user field
        var removeOtherUser = await UserModel.updateOne({_id: otherUser._id}, {$pull: {contracts: user.contracts[i]}})

        //removing contract from contracts collection
        var removeContract = await ContractModel.deleteOne({_id: user.contracts[i]});
      }
    }

    res.send(contractsToRemove);
  }
  catch(err) {

    console.log("error updating contracts");
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/updateInvites', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');

    //getting user from userId
    var user = await UserModel.findOne({ _id: req.user._id });

    var contractsToRemove = [];

    for(var i = 0; i < user.contracts.length; i++) {

      var currentContract = await ContractModel.findOne({_id: user.contracts[i]});

      //removes all other pending contracts from user
      if(currentContract.pending) {
        contractsToRemove.push(user.contracts[i]);
      }
    }

    var contractId = req.query.id;
    contractId instanceof mongoose.Types.ObjectId;
    var contract = await ContractModel.findOne({_id: contractId});
    var otherUser;
    if(contract.participants[0].equals(req.user._id))
      otherUser = await UserModel.findOne({_id: contract.participants[1]});
    else {
      otherUser = await UserModel.findOne({_id: contract.participants[0]});
    }

    for(var i = 0; i < otherUser.contracts.length; i++) {

      var currentContract = await ContractModel.findOne({_id: otherUser.contracts[i]});

      //removes all other pending contracts from other user
      if(currentContract.pending) {
        contractsToRemove.push(otherUser.contracts[i]);
      }
    }

    for(var i = 0; i < contractsToRemove.length; i++) {

      //remove from user contract field
      var removeUser = await UserModel.updateOne({_id: req.user._id}, {$pull : {contracts: contractsToRemove[i]}});

      //remove from other user contract field
      var removeOtherUser = await UserModel.updateOne({_id: otherUser._id}, {$pull: {contracts: contractsToRemove[i]}});

      //remove from contract collection
      var removeContract = await ContractModel.deleteOne({_id: contractsToRemove[i]});
    }

    res.send(contractsToRemove);
  }
  catch(err) {

    console.log("error updating invites");
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/acceptContract', async(req, res, next) => {

  try {

    var ContractModel = require('../models/wellnesscontract.js');
    //getting user from userId
    var result = await ContractModel.update({ _id: req.body.contractId }, {pending: false});
    res.send(result);
  }
  catch(err) {

    console.log("error accepting contract");
    res.status(500).send(err);
  }
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
    var taskId = req.body.taskId;
    taskId instanceof mongoose.Types.ObjectId;
    var task = await TaskModel.findOne({_id: taskId});

    //removes last date

    var lastCompletion = task.datesCompleted[task.datesCompleted.length - 1];
    var markAsIncomplete = await TaskModel.updateOne({_id: taskId}, { $pull: {datesCompleted: lastCompletion}});

    //calculating credits to remove from user
    var updatedCredits;
    if(task.daily) {
      updatedCredits = user.credits - Math.floor((10 + task.streak) * 1.5);
      var streakUpdate = await TaskModel.updateOne({_id: taskId}, {streak: task.streak - 1});
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
  }
  catch(err) {

    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/isDone', async(req, res, next) => {

  try {
    var TaskModel = require('../models/task.js');


    //getting user from userId
    var taskId = req.query.id;
    taskId instanceof mongoose.Types.ObjectId;
    var task = await TaskModel.findOne({ _id: taskId });


    if(task.datesCompleted.length > 0) {

      var mostRecentCompletion = task.datesCompleted[task.datesCompleted.length - 1];
      var pastDue = new Date();
      var today = new Date();
      var nextDue = new Date();

      if(!task.daily) {

        var counter = 0;
        for(var i = today; counter < 7; i++) {

          if(task.frequency[i])
            break;

          //reset i to sunday
          if(i == 6)
            i = 0;

          counter++;
        }

        nextDue.setDate(today.getDate() + counter);
        counter = 0;
        for(var i = today; counter < 7; i--) {

          if(task.frequency[i])
            break;

          //reset i to sunday
          if(i == 0)
            i = 6;

          counter++;
        }
        nextDue.setDate(today.getDate() + counter);
      }

      if(mostRecentCompletion.getDate() == today.getDate())
        mostRecentCompletion = today;

      if(mostRecentCompletion <= nextDue && mostRecentCompletion >= pastDue) {
        res.send({done: true});
      }
      else {
        res.send({done: false});
      }
    }
    else {

      res.send({done: false});
    }
  }
  catch(err) {

    console.log("error checking is done");
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
