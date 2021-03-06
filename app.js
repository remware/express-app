var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var sql = require('mssql');
var config = {
  user: 'movies',
  password: 'pluralrem1!',
  server: 'remzure.database.windows.net',
  database: 'Movies',
  options: {
    encrypt: true
  }
};
//sql.connect(config, function(err) {
//  console.log(err);
//});

// view engine setup ( 'html' works )
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

var elements = ["may", "cat", "amy"];
// "student", "students", "dog", "studentssess", "cat"

function rearrange(elements, length) {
  var uniqueElements = elements.map(function(word) {
    var uniqueSet = word.split('').filter(function(el){
      return el.indexOf(uniqueSet) > -1;
    });
    return uniqueSet;
  });
  
  
  return ``;
}


var nav= [
  {
    Link: '/Movies',
    Text: 'Movies'  
  }, 
  { Link: '/Directors',
     Text: 'Directors'
  }];

var moviesRouter = require('./routes/moviesRoutes')(nav);
var adminRouter = require('./routes/adminRoutes')(nav);
var authRouter = require('./routes/authRoutes')(nav);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({secret: 'catalog', saveUninitialized: false, resave: false}));
require('./config/passport')(app);

app.disable('x-powered-by');

// funtional routes on own js
app.use('/Movies', moviesRouter);
app.use('/Admin', adminRouter );
app.use('/Auth', authRouter );

// uncomment after placing your favicon in /public
// app.user works as middleware
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', function(req, res) {
  res.render('index', { title: 'in EJS', 
                        nav: nav});
});

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
