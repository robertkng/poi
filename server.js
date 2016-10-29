require('dotenv').config();
const express        = require('express');
const logger         = require('morgan');
const homeRoute      = require('./routes/home');
const cityRoute      = require('./routes/home');
const path           = require('path');
// bodyParser, allows us to make post request and get values from the forms
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');


const app            = express();
const port           = process.env.PORT || 3000;

// set up logging so that we can see what's happening
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));


// set static assets path
app.use(express.static(path.join(__dirname, 'public')));

// set default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware to receive form inputs

// middleware for method override
app.use(methodOverride('_method'));

app.listen(port, () => console.log('server is listen on port ', port));
// setting the homepage to a specific file
// routes need to be towards the end of the page as they should not be referenced prior to
// to other functions being called upon as this can cause unnecessary errors
app.use('/', homeRoute);
app.use('/city', cityRoute)



