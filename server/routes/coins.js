var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

const COIN_MARKET_CAP_URL = "https://pro-api.coinmarketcap.com/v1";
const COIN_MARKET_CAP_API_KEY = "9dd656b1-9f39-4166-a045-7f1d593708b0";

router.get('/coin', (req, res) => {
  let slug = req.query.slug;

  fetch(COIN_MARKET_CAP_URL + "/cryptocurrency/info?slug=" + slug, {
    method: 'GET',
    mode: 'cors',
    headers: {
      "X-CMC_PRO_API_KEY": COIN_MARKET_CAP_API_KEY
    }
  }).then(response => {
    return response.json();
  }).then(response => {
    for (key in response.data) {
      res.status(200).json(response.data[key]);
    }
  }).catch(err => {
    console.error(err);
  });
})

module.exports = router;
