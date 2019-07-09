var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

const coinMarketCapURL = "https://pro-api.coinmarketcap.com/v1";
const coinMarketCapAPI_KEY = "9dd656b1-9f39-4166-a045-7f1d593708b0";

router.get('/coin', (req, res) => {
  fetch(coinMarketCAPURL + "/cryptocurrency/info?slug=" + req.query.slug, {
    method: 'GET',
    mode: 'cors',
    headers: {
      "X-CMC_PRO_API_KEY": coinMarketCapAPI_KEY
    }
  }).then(response => response.json())
    .then(response => {
    return response.data[req.query.slug];
  }).catch(err => {
    console.error(err);
  });
})

module.exports = router;
