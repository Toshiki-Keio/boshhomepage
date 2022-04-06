var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // renderでオプションを設定することで、例えば値の引き渡しができる
  res.render('bosh_home');
});

// router.post('/', (req,res,next) => {
//     res.render('/activity');
// });

module.exports = router;