const router        = require('express').Router();
const { getCity }   = require('../services/poilocator');
// const dbService     = require('../models/favorites');
const { saveFavorites, showFavorites, deleteFavorites }   = require('../models/favorites');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', (req,res) => {
  res.render('index', {
  showTheCity: [],
  // showTheFavorites: res.saved || [],
  });
});

router.get('/city', showFavorites, getCity, (req, res) => {
  // console.log(res.city);
  res.render('city', {
    showTheCity: res.city || [],
    showTheFavorites: res.saved || [],
    // city: res.city,
    // cityEjs: displayCity,
  });
});

//middleware exists between favorites and req,res
router.post('/city', saveFavorites, (req, res) => {
  res.redirect('/city');
});



module.exports = router;

// <p><a href="<%= info.location.google_maps_link %>"> </p>
