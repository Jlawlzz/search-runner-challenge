"use strict";

const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

app.get('/', (req, res) => {
  res.send('Hello!');
});
