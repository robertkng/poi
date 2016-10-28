const router        = require('express').Router();
const { getCity }   = require('../services/poilocator');
const dbService     = require('../models/favorites');

router.get('/', (req,res) => {
  res.render('index', {
  displayResults: [],
  });
});

router.get('/city', getCity, (req, res) => {
  console.log(res.city);
  res.render('city', {
    displayResults: res.city || [],
    city: res.city,
    // cityEjs: displayCity,
  });
});

//middleware exists between favorites and req,res
router.post('/city', dbService.saveFavorites, (req, res) => {
  res.redirect('/');
});


module.exports = router;

// <p><a href="<%= info.location.google_maps_link %>"> </p>
