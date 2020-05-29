var express = require('express');
var router = express.Router();
var Task = require('../models/task')
var mongoose = require('mongoose')
var User = require('../models/user')
var Contract = require('../models/wellnesscontract')
var Pet = require('../models/pet')
var Cosmetic = require('../models/cosmetic');
const MongoClient = require('mongodb').MongoClient;

/*TBD*/
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

/*Customize Screen*/
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

/*Add Task*/
router.post('/createTask', async(req, res, next) => {

  try {
    var TaskModel = require('../models/task.js');
    var taskToCreate = new TaskModel(req.body);
    taskToCreate.start_date = new Date();

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

router.post('/editTask', async(req, res, next) => {
   try{
     var Task = require('../models/task.js');
     var id = mongoose.Types.ObjectId(req.body._id)
     var task = new Task(req.body);

     var result = await Task.findByIdAndUpdate(id, task);
     res.send(result);
   }
   catch(err) {

    console.log(err);
    res.status(500).send(err);
  }

 });

/*Home Screen*/
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


/*View Wellness Contract */
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
