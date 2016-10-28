require('dotenv').config();
const express       = require('express');
const logger        = require('morgan');
const homeRoute     = require('./routes/home');
const cityRoute     = require('./routes/home');
// const path = require('path');
// const favorites = require('./models/favorites');
// bodyParser, allows us to make post request and get values from the forms
// const bodyParser  = require('body-parser');
// const methodOverride = require('method-override');
// const { getCity } = require('./services/poilocator');


const app           = express();
const port          = process.env.PORT || 3000;

// set up logging so that we can see what's happening
app.use(logger('dev'));

//setting the homepage to a specific file
app.use('/', homeRoute);
app.use('/city', cityRoute)
// set static assets path
// app.use(express.static(path.join(__dirname, 'public')));

// set default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware to receive form inputs
// app.use(bodyParser.urlencoded({ extended: true }));

// middleware for method override
// app.use(methodOverride('_method'));



app.listen(port, () => console.log('server is listen on port ', port));
