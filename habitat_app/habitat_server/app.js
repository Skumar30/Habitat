require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var indexRouter = require('./routes/index');
var addRouter = require('./routes/AddTask')
var createRouter = require('./routes/CreateContract')
var customizeRouter = require('./routes/Customize')
var dailyRouter = require('./routes/DailyTask')
var friendsRouter = require('./routes/Friends')
var homeRouter = require('./routes/Home')
var regRouter = require('./routes/RegTask')
var settingRouter = require('./routes/Settings')
var wellnessRouter = require('./routes/WellnessContractHome')

var usersRouter = require('./routes/users');
var MongoStore = require('connect-mongo')(session);
var app = express();
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
  console.log('connected');
});

require('./config/passport');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/addTask', addRouter);
app.use('/createContract', createRouter)
app.use('/customize', customizeRouter)
app.use('/dailyTask', dailyRouter)
app.use('/friends', friendsRouter)
app.use('/home', homeRouter)
app.use('/regTask', regRouter)
app.use('/settings', settingRouter)
app.use('/wellnessContract', wellnessRouter)


app.use('/users', usersRouter);

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
  res.send('internel error');
});

module.exports = app;
