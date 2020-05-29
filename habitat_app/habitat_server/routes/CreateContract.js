const MongoClient = require('mongodb').MongoClient;
var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();

router.post('/createContract', async(req, res, next) => {
    try {
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

router.get('/getTasks', (req, res) => {
    var Task = require('../models/task')
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

        var result = await UserModel.update(
            { _id: req.user._id },
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
            {_id: req.body.friendID},
            {$push: {contracts: mongoose.Types.ObjectId(req.body.contractId)}}
        );

        res.send(result);
    } catch (err) {

        res.status(500).send(err);
    }
});

router.post('/updateContract', async(req, res, next) => {

    try {
        var ContractModel = require('../models/wellnesscontract.js');


        var result = await ContractModel.findByIdAndUpdate(req.body.contractId, {tasks: req.body.tasks});
        res.send(result);
    }
    catch(err) {
        res.status(500).send(err);
    }


});