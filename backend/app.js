// Require dotenv at the top of your file
require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const fs = require('fs');
// Read the file contents
const fileContents = fs.readFileSync('config.json', 'utf8');
// Parse the JSON data
const data = JSON.parse(fileContents);
// Access the username and password properties
const username = data.username;
const password = data.password;


// vključimo mongoose in ga povežemo z MongoDB
var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://"+username+":"+password+"@cluster0.uze1mlp.mongodb.net/InteractiveSportsEventsDisplay?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// vključimo routerje
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoutes');

const footballPlayerRouter = require('./routes/football_playerRoutes');
const footballGameRouter = require('./routes/football_gameRoutes');
const footballTeamRouter = require('./routes/football_teamRoutes');
const footballStatisticRouter = require('./routes/football_statisticRoutes');





const volleyballPlayerRouter = require('./routes/volleyball_playerRoutes');
const volleyballTeamRouter = require('./routes/volleyball_teamRoutes');
const volleyballGameRouter = require('./routes/volleyball_gameRoutes');

const handballRankingRouter = require('./routes/handball_rankingRoutes');
const handballPlayerRouter = require('./routes/handball_playerRoutes');
const handballTeamRouter = require('./routes/handball_teamRoutes');
const handballGameRouter = require('./routes/handball_gameRoutes');


const messageRouter = require('./routes/messageRoutes');
const volleyballStatisticRouter = require('./routes/volleyball_statisticRoutes');

var app = express();

//CORS1
/*
var cors = require('cors');
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://20.86.170.170:3001', 'http://20.86.170.170:3000'];
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // Allow requests with no origin (mobile apps, curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin)===-1){
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
*/
var cors = require('cors');

app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    // Allow requests from any origin (disable CORS)
    return callback(null, true);
  }
}));

const hbs = require('hbs');
// Define a custom helper function
hbs.registerHelper('toDayMonthYear', function(dateStr) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
  const month = date.toLocaleDateString('en-GB', { month: '2-digit' });
  const year = date.toLocaleDateString('en-GB', { year: 'numeric' });
  return `${day}/${month}/${year}`;
});
// equal function
hbs.registerHelper('ifEquals', function(arg1, arg2) {
  return (arg1 === arg2);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Vključimo session in connect-mongo.
 * Connect-mongo skrbi, da se session hrani v bazi.
 * Posledično ostanemo prijavljeni, tudi ko spremenimo kodo (restartamo strežnik)
 */
var session = require('express-session');
var MongoStore = require('connect-mongo');
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: mongoDB})
}));
//Shranimo sejne spremenljivke v locals
//Tako lahko do njih dostopamo v vseh view-ih (glej layout.hbs)
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/volleyball/players', volleyballPlayerRouter);
app.use('/volleyball/teams', volleyballTeamRouter);
app.use('/volleyball/statistic', volleyballStatisticRouter);
app.use('/volleyball/games', volleyballGameRouter);

app.use('/handball/statistic', handballRankingRouter);
app.use('/handball/teams', handballTeamRouter);
app.use('/handball/players', handballPlayerRouter)
app.use('/handball/games', handballGameRouter)

app.use('/football/statistic', footballStatisticRouter);
app.use('/football/teams', footballTeamRouter);
app.use('/football/players', footballPlayerRouter)
app.use('/football/games',footballGameRouter)

app.use('/', indexRouter);
app.use('/messages', messageRouter);

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
