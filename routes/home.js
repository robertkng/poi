const router = require('express').Router();
const { getCity } = require('../services/poilocator');

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
  });
});

module.exports = router;

// <p><a href="<%= info.location.google_maps_link %>"> </p>
