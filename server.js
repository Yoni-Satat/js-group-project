const express = require('express');
const parser = require('body-parser');
const server = express();

const MongoClient = require('mongodb').MongoClient;

server.use(express.static('client/build'));
server.use(parser.urlencoded({extended:true}));
server.use(parser.json());

server.listen(3000, function () {
  console.log('Listening on port 3000');
});
