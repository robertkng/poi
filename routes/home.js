// set up dependencies
const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { searchCity } = require('../services/poilocator');
const { saveFavorites, showFavorites, deleteFavorites, editCity, getCity } = require('../models/favorites');
const methodOverride = require('method-override');

// middleware for method override
router.use(methodOverride('_method'));

// middleware to render the saved favorites onto the index page after user has been
// authenticated
router.get('/', authenticate, showFavorites, (req, res) => {
  res.render('index', {
// res.user is if a user has signed up to user the site
    user: res.user,
    showTheCity: [],
// res.saved pulls up the favorites of the user profile, after it has been authenticated
    showTheFavorites: res.saved || [],
  });
});

// middleware to call below functions when on city page and rendering the favorites to the
// city page once user is authenticated
router.get('/city', authenticate, searchCity, showFavorites, (req, res) => {
  res.render('city', {
// res.user is if a user has logeed into
    user: res.user,
// res.city to display the data pulled from API
    showTheCity: res.city || [],
// res.saved pulls up the favorites of the user profile, after it has been authenticated
    showTheFavorites: res.saved || [],
  });
});

// middleware to show favorites once user is logged on
router.get('/edit/:id', getCity, (req, res) => {
// page renders the saved favorites for edit
  res.render('edit', { city: res.city });
});


router.put('/edit/:id', editCity, (req, res) => {
// page redirects back to city page after edit is made
  res.redirect('/city');
});

// middleware to call below function when on city page and redirecting back to city page
// after deleting specific id
router.delete('/city/:id', deleteFavorites, (req, res) => {
  res.redirect('/city');
});

//middleware exists between favorites and req,res
router.post('/city', saveFavorites, (req, res) => {
  res.redirect('/city');
});

module.exports = router;
