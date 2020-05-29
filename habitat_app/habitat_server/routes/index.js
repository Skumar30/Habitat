var User = require('../models/user');
var Task = require('../models/task');
var Contract = require('../models/wellnesscontract')
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
      {happiness: updatedHappiness}
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
        { credits: totalCredits }
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
    var otherResult = await UserModel.updateOne({_id: otherUser.id}, {credits: otherUserBonus});
    var otherUserPet = await PetModel.findOne({_id: otherUser.pet_id});
    var otherUserHappiness = otherUserPet.happiness + Math.floor(bonus / 10);
    otherResult = await PetModel.updateOne({_id: otherUser.pet_id}, {happiness: otherUserHappiness});


router.post('/createContract', async(req, res, next) => {
  try {
    console.log(req.body.contractId);
    var ContractModel = require('../models/wellnesscontract.js');
    var contractToCreate = new ContractModel(req.body);
    contractToCreate.participants = [req.user._id, mongoose.Types.ObjectId(req.body.friend)];
    contractToCreate.owner = req.user._id;
    contractToCreate.pending = true;
    var result = await contractToCreate.save();

    res.send(result);
  }
  catch(err) {

    console.log(err);
    res.status(500).send(err);
  }
});


router.post('/removeReward', async(req, res, next) => {
=======
router.get('/getTasks', (req, res) => {
    Task.find({"_id" : {$in: req.user.tasks}}, function(err, user){
        res.json(user);
        console.log(user);
    })
});

//get friends
router.get('/getFriends', (req, res) => {
    User.find({"_id" : {$in: req.user.friends}}, function(err, user){
        res.json(user);
        console.log(user);
    })
});

router.post('/addContract', async(req, res, next) => {


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
      updatedCredits = user.credits - Math.floor((10 + task.streak) * 1.5)
    }
    else {
      updatedCredits = user.credits - 45;
    }

    var result = await UserModel.update(
        { _id: req.user._id },

        { credits: updatedCredits }
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
  });

router.get('/getMyTasks', async (req, res, next) => {
    try {
      //reference to user and contract model
      var UserModel = require('../models/user.js');
      var ContractModel = require('../models/wellnesscontract.js');
      var TaskModel = require('../models/task.js');

      //getting contract from passed in query id
      var currContract = await ContractModel.findOne({ _id: req.query.id });

        { $push: { contracts: mongoose.Types.ObjectId(req.body.contractId) } }
    );

    res.send(result);
  }
  catch(err) {

    console.log("error adding contract");
    res.status(500).send(err);
  }
});

router.post('/addContractToFriend', async(req, res, next) => {

  try {
    var UserModel = require('../models/user.js');

    var result = await UserModel.update(
        { _id: req.body.friendID },
        { $push: { contracts: mongoose.Types.ObjectId(req.body.contractId) } }
    );

    res.send(result);
  }
  catch(err) {

    res.status(500).send(err);
  }
});


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

    //happiness can be a min of 0
    if(updatedHappiness < 0)
      updatedHappiness = 0;

    var result2 = await PetModel.update(
      {_id: req.user.pet_id},
      {happiness: updatedHappiness}
    );

    //calculating bonus to remove
    var contractId = req.body.contractId;
    contractId instanceof mongoose.Types.ObjectId;
    var contract = await ContractModel.findOne({_id: contractId});
    var bonus = Math.floor(1 / contract.tasks.length * 100);

    var totalCredits = updatedCredits - bonus;
    var result = await UserModel.update(

    //removing the contract from the user's contract field
    var result = await ContractModel.update(

        { _id: req.user._id },
        { credits: totalCredits }
    );

    //removing bonus to other user
    var otherUser;
    if(req.user._id.equals(contract.participants[0]))
      otherUser = await UserModel.findOne({_id: contract.participants[1]});
    else {
      otherUser = await UserModel.findOne({_id: contract.participants[0]});
    }

    var otherUserBonus = otherUser.credits - bonus;
    var otherResult = await UserModel.updateOne({_id: otherUser.id}, {credits: otherUserBonus});
    var otherUserPet = await PetModel.findOne({_id: otherUser.pet_id});
    var otherUserHappiness = otherUserPet.happiness - Math.floor(bonus / 10);
    otherResult = await PetModel.updateOne({_id: otherUser.pet_id}, {happiness: otherUserHappiness});
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
