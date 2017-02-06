"use strict";

const http = require('http');
const express = require('express');
const flightSearch = require('./flight-search');
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/flights/search', (req, res) => {
  flightSearch.getResults()
  .then(results => {
    res.json({results: results});
  });
});
