// set up dependencies
const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { searchCity } = require('../services/poilocator');
const { saveFavorites, showFavorites, deleteFavorites, editCity, getCity } = require('../models/favorites');
const methodOverride = require('method-override');

// middleware for method override
router.use(methodOverride('_method'));

// middleware to call below functions when on index page and rendering to index page
router.get('/', authenticate, showFavorites, (req, res) => {
  res.render('index', {
    user: res.user,
    showTheCity: [],
    showTheFavorites: res.saved || [],
  });
});

// middleware to call below functions when on city page and rendering to city page
router.get('/city', authenticate, searchCity, showFavorites, (req, res) => {
  res.render('city', {
    user: res.user,
    showTheCity: res.city || [],
    showTheFavorites: res.saved || [],
  });
});

router.get('/edit/:id', getCity, (req, res) => {
  res.render('edit', { city: res.city });
});

router.put('/edit/:id', editCity, (req, res) => {
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
