var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.write('fdsa');
  console.log(req);
  if (req.message) {
    console.log('FDS');
  }
});

/* GET home page. */
router.get('/wellnesscontract', function (req, res, next) {
  //Contract.find({"_id" : { $inreq.user.contracts
});

module.exports = router;
