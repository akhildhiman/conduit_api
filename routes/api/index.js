var express = require('express');
var router = express.Router();
var userRouter = require("./users")
var articleRouter = require("./articles")



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
