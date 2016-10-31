// set up dependencies so they can be referenced upon
const dotEnv = require('dotenv').config({ silent: true });
const express = require('express');
const logger = require('morgan');
const path = require('path');
// bodyParser, allows post request to be made and get values from the forms
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const homeRoute = require('./routes/home');
const cityRoute = require('./routes/home');

const app = express();
const SECRET = 'port3000';

// set default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// set up logging so that we can see what's happening
app.use(logger('dev'));

// turn text to url encoded data to be, which allows form data to POST
// middleware to receive form inputs
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// middleware for method override
app.use(methodOverride('_method'));


// This is how we read the cookies sent over from the browser
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET,
}));

// set static assets path so css file can be referenced
app.use(express.static(path.join(__dirname, 'public')));

// routes to be used
app.use('/', indexRouter);
app.use('/', homeRoute);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/city', cityRoute);

// Listen on port for connections. Look for PORT environment first, if
// that doesn't work, use port 3000
// process.env.PORT is needed for when we deploy to Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
// setting the homepage to a specific file
// routes need to be towards the end of the page as they should not be referenced prior to
// to other functions being called upon as this can cause unnecessary errors
