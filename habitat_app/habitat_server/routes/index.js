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

// get owned
router.get('/owned', (req, res) => {
  User.findById(mongoose.Types.ObjectId(currentUser), function (err, user) {
    res.json(user.cosmetics);
    console.log(user.cosmetics);
  });
});

//get active
router.get('/active', (req, res) => {
  User.findById(mongoose.Types.ObjectId(currentUser), function (err, user) {
    res.json(user.cosmetics_on);
    console.log(user.cosmetics_on);
  });
});

//get credits
router.get('/credits', (req, res) => {
  User.findById(mongoose.Types.ObjectId(currentUser), function (err, user) {
    res.json(user.credits);
    console.log(user.credits);
  });
});

//set owned

router.post('/setOwned', function (req, res) {
  var id = mongoose.Types.ObjectId(currentUser);
  User.findByIdAndUpdate(id, { $set: { cosmetics: req.body.owned } }, function (err, result) {
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
  User.findByIdAndUpdate(id, { $set: { cosmetics_on: req.body.active } }, function (err, result) {
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
  User.findByIdAndUpdate(id, { $set: { credits: req.body.credits } }, function (err, result) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Else: " + result);
      res.json(result);
    }
  });
});

// router.post('/posts', function(req, res) {
//   User.findById(mongoose.Types.ObjectId(currentUser), function (err, user) {
//     res.json(user.credits);
//     console.log(user.credits);
//   });

//   // post.save(function(err, post) {
//   //     res.json(post);
//   // });
// });

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

// //get all cosmetics
// router.get('/cosmetics', (req, res) => {
//   Cosmetic.find(req.cosmetics., function (err, cosmetic) {
//     res.json(cosmetic);
//     console.log(cosmetic);
//   });
// });

// const uri = "mongodb+srv://aquan@ucsd.edu:Habitat2020@cluster0-zv2fa.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const db = client.db("habitat")
//   const cosmetics = db.collection("cosmetics").find();
//   // cosmetics.each(function (err, doc) {
//   //   console.log(doc);
//   // });

//   //console.log(cosmetics);
//   console.log("connected");
//   client.close();
// });


module.exports = router;
