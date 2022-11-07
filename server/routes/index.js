var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // View-Model
  res.render('index', {
    title: 'Express',
    author: 'Ivan Rivalcoba'
  });
});

module.exports = router;
