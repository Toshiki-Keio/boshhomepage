var express = require('express');
var router = express.Router();
let sqlite = require('sqlite3').verbose();
let db = new sqlite.Database("bosh_homepage.db");
const passport = require("passport");
var session = require('express-session');
var cookieParser = require('cookie-parser');
const LocalStrategy = require("passport-local").Strategy;
var session = require('express-session');
// Flashコーナー
// const flash = require('connect-flash');
// router.use(flash());
// sessionコーナー

db.all("SELECT * FROM admin_login", (err, rows) => {
    username = rows[0].id;
    userpassword = rows[0].password;
});
function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()) {  // 認証済
        console.log("succeed");
        return next();
    }
    else {  // 認証されていない
        console.log("error");
        res.redirect('/admin_login');  // ログイン画面に遷移
    }
};

// ここが全てに影響してる
router.use(session({
    // 'wood'
    secret: '○○',
    resave: false,
    saveUninitialized:false,
    cookie:{
        httpOnly: true,
        secure: false,
        maxage: 1000 * 60 * 1
    }
}));
// Init passport authentication 
router.use(passport.initialize());
// persistent login sessions 
router.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// passportの設定コーナー
passport.use("mylogin",
    new LocalStrategy({
        usernameField: "identification",
        passwordField: "password"
    },function(identification,password,done){
    if(identification === username && password === userpassword){
        console.log("Login succeeded!!"); // ログイン成功と判定する
        return done(null, true); 
    }
    console.log("Login Failed...");        
    return done(null,false);
     // ログイン失敗と判定する
    })
);

// ログイン画面
router.get("/admin_login", function(req,res,next) {
    res.render('admin_login');
});
// 成功、失敗の分岐
router.post("/admin_login", passport.authenticate(
    "mylogin",
    {
        successRedirect: "/admin_login/admin",
        failureRedirect: "/admin_login",
        failureFlash: true,
        // passReqToCallback: true
        session: true
    }
));

// ログイン成功時の画面
router.get('/admin_login/admin',checkAuthenticated, function(req,res,next) {
    console.log("Select Completed!!");
    db.all("SELECT * FROM contact_form", (err, rows) => {
        let opt = {
            data: rows
        }
        console.log('Admin surface');
        res.render("admin", opt);
    });
});

function logoutcompleted(req, res, next){
    if (!req.isAuthenticated()) {  
        res.redirect('/admin_login');
        console.log("Logout!!");
    }
    else {  // 認証されていない
        console.log("Not yet..");
          // ログイン画面に遷移
    }
};

router.get('/admin_login/admin/logout',checkAuthenticated, (req, res) => {
    req.logout();
    console.log("See you later~");
    res.render('logout');
});

module.exports = router;