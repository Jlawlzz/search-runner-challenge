"use strict";

const request = require('request');

module.exports = {

  search(service, callback) {
    console.log(`searching flights for ${service}.`);
    request({
      uri: `http://localhost:9000/scrapers/${service}`,
      method: "GET"
    }, (error, response, body) => {
      const results = JSON.parse(body).results;
      callback(error, results);
    });
  }

}
