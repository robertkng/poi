// set up dependencies and API variables
const fetch = require('node-fetch');
const API_URL = "https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-text?";
const API_KEY = process.env.AMADEUS_KEY;

// set up function to query within the API
function searchCity(req,res,next) {
  fetch(`${API_URL}apikey=${API_KEY}&city_name=${req.query.city }`)
//parses the json string on the server
  .then(results => results.json())
  .then((results) => {
    // console.log(res.city);
    res.city = results.points_of_interest;
// }
    // if (results.points_of_interest === 'defined') {
    // res.city = results.points_of_interest;
    // } else {
    // skip results.contextual_images[0].medium.url;
    // }



// function searchCity(req,res,next) {
//   try {fetch(`${API_URL}apikey=${API_KEY}&city_name=${req.query.city }`)
// //parses the json string on the server
//   .then(results => results.json())
//   .then((results) => {
//     // console.log(res.city);
//     res.city = results.points_of_interest;
//   } catch(e) {
//     res.city = results.points_of_interest && skip results.contextual_images[0].medium.url;
//     }
// }

    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  })
}

module.exports = { searchCity };

