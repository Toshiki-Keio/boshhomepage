var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // renderでオプションを設定することで、例えば値の引き渡しができる
  res.render('index', { title: 'Express' });
});

module.exports = router;
