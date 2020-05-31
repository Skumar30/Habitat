var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Pet = require('../models/pet');

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

module.exports = router;