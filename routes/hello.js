var express = require('express');
var router = express.Router();

let opt = {
  title: 'My name is Toshiki Fukui',
  message: 'New comer from JPN' 
};

router.get('/', function(req, res, next) {
  res.render('hello', opt);
});
module.exports = router;
