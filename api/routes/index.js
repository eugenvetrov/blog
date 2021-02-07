var express = require('express');
var router = express.Router();

/*
 GET home page. 
___________________

Домашняя страница по запросу GET
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
