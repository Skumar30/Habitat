var express = require('express');
var router = express.Router();
var Cosmetic = require('../models/cosmetic');
var User = require('../models/user');
var Pet = require('../models/pet');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.write('fdsa');
  console.log(req);
  if (req.message) {
    console.log('FDS');
  }
});


// router.get('/cosmetics', (req, res) => {
//   Cosmetic.findById(mongoose.Types.ObjectId('5ebddb16a428ab3a446f4d9c'), function (err, cosmetic) {
//     res.json(cosmetic);
//     console.log(cosmetic);
//   });
// });

var currentUser = '5eba30c69234b45a84410736';
//mongoose.Types.ObjectId(currentUser)
// get owned

router.get('/owned', (req, res) => {
  console.log(req.user);
  res.json({ owned: req.user.cosmetics, credits: req.user.credits });
  //console.log(req.user._id);
  // Cosmetics.find(req.user.cosmet, function (err, user) {
  //   res.json(req.user.cosmetics);
  //   console.log(user.cosmetics);
  // });
});

//get active
router.get('/active', async (req, res) => {
  var p = await Pet.findOne({ _id: req.user.pet_id });
  res.json({ active: p.cosmetics });
  //console.log(req.user._id);
  // var id = req.user._id;
  // User.findById(mongoose.Types.ObjectId(id), function (err, user) {
  //   res.json(user.cosmetics_on);
  //   console.log(user.cosmetics_on);
  // });
});

//get credits
router.get('/credits', (req, res) => {
  res.json({ credits: req.user.credits });

  //console.log(req.user._id);
  // var id = req.user._id;
  // User.findById(mongoose.Types.ObjectId(currentUser), function (err, user) {
  //   res.json(user.credits);
  //   console.log(user.credits);
  // });
});

//set owned

router.post('/setOwned', function (req, res) {
  var id = mongoose.Types.ObjectId(currentUser);
  User.findByIdAndUpdate(req.user._id, { $set: { cosmetics: req.body.owned } }, function (err, result) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Else: " + result);
      res.json(result);
    }
  });
});

router.post('/setActive', function (req, res) {
  var id = mongoose.Types.ObjectId(currentUser);
  Pet.findByIdAndUpdate(req.user.pet_id, { $set: { cosmetics: req.body.active } }, function (err, result) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Else: " + result);
      res.json(result);
    }
  });
});

router.post('/setCredits', function (req, res) {
  var id = mongoose.Types.ObjectId(currentUser);
  User.findByIdAndUpdate(req.user._id, { $set: { credits: req.body.credits } }, function (err, result) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Else: " + result);
      res.json(result);
    }
  });
});

router.get('/home', async (req, res) => {
  var petModel = require('../models/pet.js');
  var pet = await petModel.findOne({ _id: req.user.pet_id });
  var cosmeticModel = require('../models/cosmetic.js');
  var cosmetic = await cosmeticModel.findOne({ _id: pet.cosmetics[0] });
  var cosmetics = [cosmetic.name];
  console.log(cosmetic);
  console.log(cosmetics);
  res.json({ name: req.user.name, petName: pet.name, credits: req.user.credits, mood: pet.happiness, pet: pet.type, cosmetics: cosmetics });
});

// // get owned
// router.get('/cosmetics', (req, res) => {
//   Cosmetic.find(mongoose.Types.Array, function (err, cosmetic) {
//     res.json(cosmetic);
//     console.log(cosmetic);
//   });
// });

// // get equipped
// router.get('/cosmetics', (req, res) => {
//   Cosmetic.find(req.pet.cosmetics, function (err, cosmetic) {
//     res.json(cosmetic);
//     console.log(cosmetic);
//   });
// });

// // // get equipped
// // router.get('/cosmetics', (req, res) => {
// //   Cosmetic.find({ "_id": { $in: req.pet.cosmetics } }, function (err, cosmetic) {
// //     res.json(cosmetic);
// //     console.log(cosmetic);
// //   });
// // });


router.get('/getTheirTasks', async (req, res, next) => {
  try {
    //reference to user and contract model
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');
    var TaskModel = require('../models/task.js');

    //getting contract from passed in query id
    var currContract = await ContractModel.findOne({ _id: req.query.id });

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
      for (var j = 0; j < userTaskIds.length; j++) {

        //if the current task is found within user's task id list
        if (currTaskId.equals(userTaskIds[j])) {

          myTask = true;
          break;
        }
      }

      if (!myTask) {
        var currTask = await TaskModel.findOne({ _id: currTaskId });
        var due_date = currTask.due_date.toString().substring(0, 15);
        theirTasks.push({ "title": currTask.title, "due_date": due_date, "id": currTaskId });
      }
    }

    //returning whether or not the user is currently in a wellness contract
    res.send(theirTasks);
  }
  catch (err) {

    console.log("error getting their tasks");
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/getMyTasks', async (req, res, next) => {
  try {
    //reference to user and contract model
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');
    var TaskModel = require('../models/task.js');

    //getting contract from passed in query id
    var currContract = await ContractModel.findOne({ _id: req.query.id });

    //given this contract, return a list of the users tasks and a list of the other user's tasks
    var currContractTaskIds = currContract.tasks;
    var userTaskIds = req.user.tasks;
    var myTasks = [];

    //iterating through each task id in the contract
    for (var i = 0; i < currContractTaskIds.length; i++) {

      //current task id
      var currTaskId = currContractTaskIds[i];

      //iterating through all of the user's task ids to find the current task
      for (var j = 0; j < userTaskIds.length; j++) {

        //if the current task is found within user's task id list
        if (currTaskId.equals(userTaskIds[j])) {

          //get the actual task from the current task id
          var currTask = await TaskModel.findOne({ _id: currTaskId });
          var due_date = currTask.due_date.toString().substring(0, 15);
          console.log("due date is: " + currTask.due_date);
          myTasks.push({ "title": currTask.title, "due_date": due_date, "id": currTaskId });
        }
      }
    }

    //returning whether or not the user is currently in a wellness contract
    res.send(myTasks);
  }
  catch (err) {

    console.log("error getting my tasks");
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/checkCurrentContract', async (req, res, next) => {
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
      var currContract = await ContractModel.findOne({ _id: currContractId });

      //if the current contract is not pending
      if (!currContract.pending)
        result.push(currContractId);
    }

    //returning whether or not the user is currently in a wellness contract
    res.send(result);
  }
  catch (err) {

    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/getPendingContracts', async (req, res, next) => {
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
      var currContract = await ContractModel.findOne({ _id: currContractId });

      //if the current contract is pending and the owner is not the user
      if (currContract.pending && !currContract.owner.equals(req.user._id)) {

        var owner = await UserModel.findOne({ _id: currContract.owner });
        //console.log("owner is: " + owner.username);
        //add owner name and due date to return list
        var due_date = currContract.due_date.toString().substring(0, 15);
        pendingContracts.push({ "owner": owner.username, "due_date": due_date, "id": currContractId });
      }
    }

    //returning list of pending contracts with info
    res.send(pendingContracts);
  }
  catch (err) {

    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/createTask', async (req, res, next) => {

  try {
    var TaskModel = require('../models/task.js');
    var taskToCreate = new TaskModel(req.body);

    var result = await taskToCreate.save();
    res.send(result);
  }
  catch (err) {

    console.log("error when creating task");
    res.status(500).send(err);
  }


});

router.post('/addTask', async (req, res, next) => {

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
  catch (err) {

    console.log(err);
    res.status(500).send(err);
  }


});

router.post('/createContract', async (req, res, next) => {

  try {
    var ContractModel = require('../models/wellnesscontract.js');
    var contractToCreate = new ContractModel(req.body);
    var result = await contractToCreate.save();
    res.send(result);
  }
  catch (err) {

    console.log("error creating contract");
    res.status(500).send(err);
  }


});

router.post('/addContract', async (req, res, next) => {

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
  catch (err) {

    console.log("error adding contract");
    res.status(500).send(err);
  }


});

router.post('/removeContract', async (req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');

    //removing the contract from the user's contract field
    var result = await UserModel.update(
      { _id: req.user._id },
      { $pull: { contracts: req.body.contractId } }
    );

    var currContract = await ContractModel.findOne({ _id: req.body.contractId });

    //removing the contract from the other user's contract field
    if (currContract.participants[0].equals(req.user._id)) {
      var temp = await UserModel.update(
        { _id: currContract.participants[1] },
        { $pull: { contracts: req.body.contractId } }
      );
    }
    else {
      var temp = await UserModel.update(
        { _id: currContract.participants[0] },
        { $pull: { contracts: req.body.contractId } }
      );
    }

    var finalResult = await ContractModel.deleteOne({ _id: req.body.contractId });

    res.send(finalResult);
  }
  catch (err) {

    console.log("error removing contract");
    res.status(500).send(err);
  }


});

router.get('/updateContracts', async (req, res, next) => {

  try {
    var UserModel = require('../models/user.js');
    var ContractModel = require('../models/wellnesscontract.js');

    //getting user from userId
    var user = await UserModel.findOne({ _id: req.user._id });

    var contractsToRemove = [];
    var currentTime = new Date();

    for (var i = 0; i < user.contracts.length; i++) {

      var currentContract = await ContractModel.findOne({ _id: user.contracts[i] });
      if (currentTime > currentContract.due_date) {
        contractsToRemove.push(user.contracts[i]);
      }
    }

    res.send(contractsToRemove);
  }
  catch (err) {

    console.log("error removing contract");
    res.status(500).send(err);
  }
});

module.exports = router;
