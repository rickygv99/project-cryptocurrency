"use strict";

const Tp = require('thingpedia');

let options = {
  dataContentType: "application/json"
};

module.exports = class Cryptocurrency extends Tp.BaseDevice {
  constructor(engine, state) {
    super(engine, state);

    this.name = "Cryptocurrency Account for " + this.state.username;
    this.description = "This is your Cryptocurrency Account. You can use it"
      + " to do anything and everything related to cryptocurrencies.";

    /* Stores the patient's credentials in our database */
    let data = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });

    Tp.Helpers.Http.post("https://almond-cryptocurrency.herokuapp.com/signup", data, options)
    .catch(err => {
      console.error(err);
    });
  }

  /*
   * Returns the cryptocurrency's symbol
   */
  get_symbol({ slug }) {
    Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/coin?slug=" + slug, options)
    .then(response => {
      console.error("Response: " + response);
      return [ response.symbol ];
    })
    .catch(err => {
      console.error(err);
      return [];
    });
  }

  /*
   * Returns a description of the cryptocurrency
   */
  get_description({ slug }) {
    Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/coin?slug=" + slug, options)
    .then(response => {
      return [ response.description ];
    })
    .catch(err => {
      console.error(err);
      return [];
    });
  }

  /*
   * Returns the websites for the cryptocurrency
   */
  get_websites({ slug }) {
    Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/coin?slug=" + slug, options)
    .then(response => {
      return [ response.urls.website ];
    })
    .catch(err => {
      console.error(err);
      return [];
    });
  }
};
