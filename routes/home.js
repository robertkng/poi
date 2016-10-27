const router = require('express').Router();
const { getCity } = require('../services/poilocator');

router.get('/', (req,res) => {
  res.render('index');
});

router.get('/city', getCity, (req, res) => {
  console.log(res.data);
  res.render('city', {
    data: res.data || [],
  });
});

// router.get('/getcity', getCity, (req, res) => {
//   console.log(res.data);
//   // res.render('index', {
//   res.json(''
//     data: res.data || []),
// });


module.exports = router;
