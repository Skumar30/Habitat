var express = require('express');
var router = express.Router();
var Task = require('../models/task');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.write('fdsa');
  console.log(req);
  if (req.message) {
    console.log('FDS');
  }
});

router.get('/EditTask', function(req, res, next){
    Task.findById(mongoose.Types.ObjectId(''), function (err, task) {
        res.json(task);
        console.log(task);
      });
});

router.post('/AddTask', function (req, res, next) {

});

module.exports = router;
