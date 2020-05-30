var express = require('express');
var router = express.Router();
var Pet = require('../models/pet')

router.get('/home', async(req, res) => {
  var pet = await Pet.findOne( {_id: req.user.pet_id});
  res.json({name: req.user.name, petName: pet.name, credits: req.user.credits, mood: pet.happiness, cosmetics: pet.cosmetics});
});

router.post('/petName', function (req, res) {
  console.log(req.body);
  Pet.findByIdAndUpdate(req.user.pet_id, { $set: { name: req.body.name } }, function (err, result) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Else: " + result);
      res.json(result);
    }
  });
});

module.exports = router;