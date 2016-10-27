const router = require('express').Router();
const { getCity } = require('../services/poilocator');

router.get('/', (req,res) => {
  res.render('index');
});




router.get('/getcity', getCity, (req, res) => {
  // console.log(res.city);
  res.render('index')
});


module.exports = router;
