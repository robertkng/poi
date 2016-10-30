const router        = require('express').Router();
const { getCity }   = require('../services/poilocator');
const { saveFavorites, showFavorites, deleteFavorites }   = require('../models/favorites');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/city', showFavorites, getCity, (req, res) => {
  res.render('city', {
    showTheCity: res.city || [],
    showTheFavorites: res.saved || [],
  });
});



module.exports = router;


