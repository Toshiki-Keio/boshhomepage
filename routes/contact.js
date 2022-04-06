var express = require('express');
const { options, render } = require('../app');
var router = express.Router();
let sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('bosh_homepage.db');

let msg1 = "何かお聞きしたいことがございましたら、以下のフォームからお気軽にご連絡ください。";
let msg2 = "フォームを送信しました。";

// 中でやりとり
router.get('/', function(req, res, next) {
  console.log("Opened contact.ejs");
  // ここで、入力された値をターミナル上に表示している
  res.render('contact', {message1 : msg1, message2 : " "});
});


router.post('/', async function(req,res,next) {
  let nameval = req.body.name;
  let emailval = req.body.email;
  let subjectval = req.body.subject;
  let messageval = req.body.message;
  console.log(nameval,emailval,subjectval,messageval);
  console.log("");
  
  // add contact_form data
  db.run(`insert into contact_form(name,mail,subject,message) values(?,?,?,?)`,
  (nameval),
  (emailval),
  (subjectval),
  (messageval),
  function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("Database Inserted!!")
  });
  res.render('contact', {message1 : " ", message2 : msg2});
  // res.redirect("/");
  // db.close();
});
module.exports = router;