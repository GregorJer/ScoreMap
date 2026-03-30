var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("Inetraktivni prikaz športnih dogodkov");
});

module.exports = router;
