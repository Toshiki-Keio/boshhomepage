var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// JS設定コーナー
var boshhomeRouter = require('./routes/bosh_home');
var projectRouter = require('./routes/project');
var onlineRouter = require('./routes/online-edu');
var activityRouter = require('./routes/activity');
var contactRouter = require('./routes/contact');
var admin_loginRouter = require('./routes/admin_login');
// app.use(require('./routes/admin'));
const bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 公開範囲を限定
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

// ルーティングを設定
// URL設定コーナー
app.use('/home', boshhomeRouter);
app.use('/project', projectRouter);
app.use('/online-edu', onlineRouter);
app.use('/activity', activityRouter);
app.use('/contact', contactRouter);
app.use('/', admin_loginRouter);
// app.use('/admin_login/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
