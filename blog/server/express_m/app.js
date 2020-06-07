var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require("fs")
var cookieParser = require('cookie-parser'); //解析cookie对象
const session = require("express-session")  // 处理session
const redisStore = require("connect-redis")(session)  //将session存储到redis
var logger = require('morgan');  // 日志记录

const redisClient = require("./db/redis")

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

// view engine setup 设置前端页面
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV

if (ENV !== "production") {
  // 开发环境
  app.use(logger('dev'));
} else {
  const filePath = path.resolve(__dirname, "./logger/access.log")
  const writeStream = fs.createWriteStream(filePath, {
    flags: "a"
  })
  // 生产环境
  app.use(logger("combined"), {
    stream: writeStream
  })
}

app.use(logger('dev'));
app.use(express.json());  //处理post请求的数据，可以直接获取req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "KO90#*&_dfaoU",
  cookie: {
    path: "/",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 * 7
  },
  store: new redisStore({
    client: redisClient
  })
}))


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
