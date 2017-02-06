"use strict";

let assert = require('chai').assert;
const flightSearch = require('../flight-search');

let results = ['a', 'c', 'b', 'd'].map(service => {
  let items = [];
  for(let i = 0; i < 5; i++) {
    items.push({
      service: service,
      agony: i
    });
  }
  return items;
});

describe('can merge array', () => {

  it('can zip input ', () => {
    const mergedResults = flightSearch.mergeResults(results);
    assert.equal(mergedResults.length, 20);
    assert.equal(mergedResults[0].service, 'a');
    assert.equal(mergedResults[0].agony, '0');
    assert.equal(mergedResults[mergedResults.length - 1].service, 'd');
    assert.equal(mergedResults[mergedResults.length - 1].agony, '4');
  });

});

describe('can sort array', () => {

  it('can re-arrange input', () => {
    const mergedResults = flightSearch.mergeResults(results);
    const shuffledArray = shuffleArray(mergedResults);
    const sortedResults = flightSearch.orderResults(shuffledArray);
    assert.equal(mergedResults.length, 20);
    assert.equal(sortedResults[0].agony, '0');
    assert.equal(sortedResults[mergedResults.length - 1].agony, '4');
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
