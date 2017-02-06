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
        this.results = results;
        this.mergeResults();
        this.orderResults();
        resolve(this.results);
      });
    });
  },

  orderResults() {
  },

  mergeResults() {
    const mergedArr = [];
    let count = findLargestArrCount(this.results);
    let resultsLength = this.results.length;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < resultsLength; j++) {
        if (this.results[j][i] !== undefined) {
          mergedArr.push(this.results[j][i]);
        }
      }
    }
    return mergedArr;
  }
}

function findLargestArrCount(results) {
  return results.sort(function(a, b){
    return b.length - a.length;
  })[0].length;
}
