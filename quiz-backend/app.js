var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRoutes');
var questionsRouter = require('./routes/QuestionRoutes');
var gameSessionsRouter = require('./routes/GameSessionsRoutes');

var app = express();

// 
//  MONGOOSE
// 

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_CONN_STRING);
}

//
//  Mongo Connect Session
//

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'foo',
  store: MongoStore.create({mongoUrl : process.env.MONGO_CONN_STRING}),
  saveUninitialized :true,
  cookie: { maxAge : 1000 * 60 * 60 * 24 * 7 },
  resave: false
}));


var cors = require('cors');
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  credentials : true,
  origin : function(origin, callback){
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) == -1){
      var msg = "The CORS policy doesnt allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/gamesessions', gameSessionsRouter);

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
  res.render(res.locals.error);
});

module.exports = app;
