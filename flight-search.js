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
        const orderedResults = this.mergeAndOrderResults(results);
        resolve(orderedResults);
      });
    });
  },

  mergeAndOrderResults(results) {
    let mergedArr = [];
    while (results.some((r) => { r !== []; })) {
      let results = this.sortLargestVal(results);
      mergedArr.push(results[results].pop());
    };
    return mergedArr.reverse();
  },

  sortLargestVal(results) {
    return results.sort((a, b) => {
      return b[b.length - 1].agony - a[a.length - 1].agony;
    });
  }

  // The solution below is a tad quicker than results.sort, but is much harder to read.
  // I have this saved for visibility.

  // sortLargestVal(results) {
  //   let smallIndex = 0;
  //   for (let i = 0; i < results.length; i++) {
  //     let result = results[i];
  //     let smallResult = results[smallIndex];
  //     if (result[result.length - 1].agony > smallResult[smallResult.length -1].agony) {
  //       smallIndex = i;
  //     }
  //   }
  //   return smallIndex;
  // }

};
