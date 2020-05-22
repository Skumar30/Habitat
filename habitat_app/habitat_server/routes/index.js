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
        var due_date = currContract.due_date.toString().substring(0, 15)
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

module.exports = router;
