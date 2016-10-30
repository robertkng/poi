const dotEnv         = require('dotenv').config({silent: true});
const express        = require('express');
const logger         = require('morgan');
const path           = require('path');
// bodyParser, allows post request to be made and get values from the forms
const bodyParser     = require('body-parser');
const session        = require('express-session');
const cookieParser   = require('cookie-parser');
const methodOverride = require('method-override');
const authRouter     = require('./routes/auth');
const usersRouter    = require('./routes/users');
const homeRoute      = require('./routes/home');
const cityRoute      = require('./routes/home');

const app            = express();
const port           = process.env.PORT || 3000;
const SECRET         = 'tacos3000';

// set up logging so that we can see what's happening
app.use(logger('dev'));


// turn text to url encoded data to be, which allows form data to POST
app.use(bodyParser.urlencoded({ extended: true }));


// set static assets path so css file can be referenced
app.use(express.static(path.join(__dirname, 'public')));

// set default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware to receive form inputs

// middleware for method override
app.use(methodOverride('_method'));

// This is how we read the cookies sent over from the browser
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/', homeRoute);
app.use('/city', cityRoute)

// Listen on port for connections
// process.env.PORT is needed for when we deploy to Heroku
app.listen(port, () => console.log('server is listen on port ', port));
// setting the homepage to a specific file
// routes need to be towards the end of the page as they should not be referenced prior to
// to other functions being called upon as this can cause unnecessary errors



