var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('!!Welcome Nodemon 😈');
});

module.exports = router;
