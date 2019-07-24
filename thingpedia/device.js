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

  /*
   * Returns the circulating supply of the cryptocurrency
   */
  get_circulating_supply({ slug }) {
    return Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/quotes?slug=" + slug)
    .then(response => {
      return JSON.parse(response);
    }).then(response => {
      return [{ circulating_supply: response.circulating_supply }];
    }).catch(err => {
      console.error(err);
    });
  }

  /*
   * Returns the total supply of the cryptocurrency
   */
  get_total_supply({ slug }) {
    return Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/quotes?slug=" + slug)
    .then(response => {
      return JSON.parse(response);
    }).then(response => {
      return [{ total_supply: response.total_supply }];
    }).catch(err => {
      console.error(err);
    });
  }

  /*
   * Returns the max supply of the cryptocurrency
   */
  get_max_supply({ slug }) {
    return Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/quotes?slug=" + slug)
    .then(response => {
      return JSON.parse(response);
    }).then(response => {
      return [{ max_supply: response.max_supply }];
    }).catch(err => {
      console.error(err);
    });
  }

  /*
   * Returns the current price of the cryptocurrency
   */
  get_price({ slug, currency }) {
    return Tp.Helpers.Http.get("https://almond-cryptocurrency.herokuapp.com/quotes?slug=" + slug)
    .then(response => {
      return JSON.parse(response);
    }).then(response => {
      return [{ price: response.quote[currency].price }];
    }).catch(err => {
      console.error(err);
    });
  }
};
