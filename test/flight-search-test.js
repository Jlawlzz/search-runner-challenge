"use strict";

let assert = require('chai').assert;
const flightSearch = require('../flight-search');

let results = [1, 2, 3, 4].map(service => {
  let items = [];
  for(let i = 0; i < 5; i++) {
    items.push({
      service: service,
      agony: i + service
    });
  }
  return items;
});

describe('can merge array', () => {

  it('can zip input ', () => {
    const shuffledResults = shuffleArray(results);
    const mergedResults = flightSearch.sortLargestVal(shuffledResults);
    assert.equal(mergedResults.length, 4);
    assert.equal(mergedResults[0][0].service, '4');
    assert.equal(mergedResults[0][0].agony, '4');
    assert.equal(mergedResults[mergedResults.length - 1][0].service, 1);
    assert.equal(mergedResults[mergedResults.length - 1][0].agony, 1);
  });

});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
