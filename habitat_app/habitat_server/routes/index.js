var express = require('express');
var router = express.Router();
var Task = require('../models/task')
var mongoose = require('mongoose')
var User = require('../models/user')
var Contract = require('../models/wellnesscontract')
var Pet = require('../models/pet')
const BASE_DAILY_REWARD = 10;
const WELLNESS_BONUS = 1.5;
const MAX_HAPPINESS_BONUS = 100;

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

router.get('/ownedAndCredits', (req, res) => {
  res.json({ owned: req.user.cosmetics, credits: req.user.credits });
});

router.get('/active', async (req, res) => {
  var p = await Pet.findOne({ _id: req.user.pet_id });
  res.json({ active: p.cosmetics });
});

router.post('/setOwned', function (req, res) {
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
  User.findByIdAndUpdate(req.user._id, { $set: { credits: req.body.credits } }, function (err, result) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Else: " + result);
      res.json(result);
    }
  });
});


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

router.get('/home', async(req, res) => {
  var petModel = require('../models/pet.js');
  var pet = await petModel.findOne( {_id: req.user.pet_id});
  res.json({name: req.user.name, petName: pet.name, credits: req.user.credits, mood: pet.happiness, cosmetics: pet.cosmetics});
});

router.post('/petName', function (req, res) {
  var petModel = require('../models/pet.js');
  console.log(req.body);
  petModel.findByIdAndUpdate(req.user.pet_id, { $set: { name: req.body.name } }, function (err, result) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Else: " + result);
      res.json(result);
    }
  });
});

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

router.delete('/deleteTask', async(req, res, next) => {
    var id = mongoose.Types.ObjectId(req.body.my_id);
    console.log('inside index delete');
    console.log(id);

    var TaskModel = require('../models/task.js');
    var UserModel = require('../models/user.js');

    TaskModel.findByIdAndRemove(id, function (err, task) {
      if (err) {
        console.log("Task Error");
        console.log(err);
      }
      else {
        res.send("Deleted task");
      }
    });


    UserModel.updateOne({'_id': req.user._id}, {$pull: {"tasks": id}}, function (err, user) {
      if (err) {
      console.log("User Error");
      console.log(err);
      }
    });

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

router.post('/updateStreak'), async(req, res, next) => {
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
};

module.exports = router;
