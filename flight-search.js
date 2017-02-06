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
        const mergedResults = this.mergeResults(results);
        const orderedResults = this.orderResults(mergedResults);
        resolve(orderedResults);
      });
    });
  },

  orderResults(results) {
    for(let i = 1; i < results.length; ++i) {
      let temp = results[i];
      let j = i - 1;
      for(; j >= 0 && results[j].agony > temp.agony; --j) {
        results[j+1] = results[j];
      }
      results[j+1] = temp;
    }
    return results;
  },

  mergeResults(results) {
    const mergedArr = [];
    let count = findLargestArrCount(results);
    let resultsLength = results.length;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < resultsLength; j++) {
        if (results[j][i] !== undefined) {
          mergedArr.push(results[j][i]);
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
