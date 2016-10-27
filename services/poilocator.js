const fetch = require('node-fetch');
const API_URL = "https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-text?";
const API_KEY = process.env.AMADEUS_KEY;

function getCity(req,res,next) {
  fetch(`${API_URL}apikey=${API_KEY}&city_name=${req.query.city || 'New York'}`)
//parses the json string on the server
  .then(r => r.json())
  .then((result) => {
    res.city = result.results;
// console.log(req.body);
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  })
}

module.exports = { getCity };
