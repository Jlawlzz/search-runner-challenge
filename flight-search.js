"use strict";

const flightScraper = require('./services/flight-scraper.js');
const async = require('async');

module.exports = {

  services: ['Expedia', 'Orbitz', 'Priceline', 'Travelocity', 'United'],

  getResults() {
    return new Promise((resolve, reject) => {
      async.map(this.services, (service, callback) => {
        flightScraper.search(service, callback);
      }, (err, results) => {
        results = this.orderResults(results);
        resolve(results);
      });
    });
  },

  orderResults(results) {
    return results;
  }
}
