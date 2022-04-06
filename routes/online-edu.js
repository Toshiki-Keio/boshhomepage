var express = require('express');
var router = express.Router();

router.get('/', (req,res,next) => {
    res.render('online-edu');
})
module.exports = router;
