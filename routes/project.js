var express = require('express');
var router = express.Router();
const { options, render } = require('../app');

router.get('/', function(req, res, next) {
    console.log("Opened project.ejs");
    res.render('project');
});

module.exports = router;