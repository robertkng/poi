const router                 = require('express').Router();
const { authenticate }       = require('../lib/auth');
const { getCity }            = require('../services/poilocator');
const { saveFavorites,
        showFavorites,
        deleteFavorites }    = require('../models/favorites');
const methodOverride         = require('method-override');

router.use(methodOverride('_method'));

router.get('/', authenticate, (req,res) => {
  res.render('index', {
    user: res.user,
    showTheCity: [],
  });
});

router.get('/city', authenticate, showFavorites, getCity, (req, res) => {
  res.render('city', {
    user: res.user,
    showTheCity: res.city || [],
    showTheFavorites: res.saved || [],
  });
});

// router.get('/city', getCity, (req,res) => {
//   res.render('city', {
//   showTheCity: res.city || [],
//   });
// });

//middleware exists between favorites and req,res
router.post('/city', saveFavorites,  (req, res) => {
  res.render('city', {
    showTheCity: res.city || [],
  });
  res.redirect('/city');
});

router.delete('/city/:id', deleteFavorites, (req, res) => {
  res.redirect('/city');
})


module.exports = router;


