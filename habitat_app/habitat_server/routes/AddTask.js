var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/user');
var Task = require('../models/task');

router.post('/createTask', async(req, res, next) => {

  try {
    var taskToCreate = new Task(req.body);
    taskToCreate.start_date = new Date();

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

router.post('/editTask', async(req, res, next) => {
   try{
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

module.exports = router;
