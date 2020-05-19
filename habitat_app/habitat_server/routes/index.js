var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Task = require('../models/task');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.write('fdsa');
  console.log(req);
  if (req.message) {
    console.log('FDS');
  }
});

router.get('/myTask', function(req,res) {
    console.log("test")
  
    let a = {test : "test"}
    Task.find({"_id" : {$in : req.user.tasks}}, function(err, user){
        console.log(user);

        res.json(user)
    })
});


module.exports = router;
