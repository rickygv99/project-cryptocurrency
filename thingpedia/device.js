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
    return Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/coin?slug=" + slug)
    .then(response => {
      return JSON.parse(response);
    }).then(response => {
      return [{ symbol: response.symbol }];
    }).catch(err => {
      console.error(err);
    });
  }

  /*
   * Returns a description of the cryptocurrency
   */
  get_description({ slug }) {
    return Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/coin?slug=" + slug)
    .then(response => {
      return JSON.parse(response);
    }).then(response => {
      return [{ description: response.description }];
    }).catch(err => {
      console.error(err);
    });
  }

  /*
   * Returns the cryptocurrency's logo
   */
  get_logo({ slug }) {
    return Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/coin?slug=" + slug)
    .then(response => {
      return JSON.parse(response);
    }).then(response => {
      return [{ logo: response.logo }];
    }).catch(err => {
      console.error(err);
    });
  }

  /*
   * Returns the websites for the cryptocurrency
   */
  get_websites({ slug }) {
    return Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/coin?slug=" + slug)
    .then(response => {
      return JSON.parse(response);
    }).then(response => {
      return [{ websites: response.urls.website }];
    }).catch(err => {
      console.error(err);
    });
  }
};
