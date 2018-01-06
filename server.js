const express = require('express');
const parser = require('body-parser');
const server = express();
const path = require('path');

const MongoClient = require('mongodb').MongoClient;

server.use(express.static('client/build'));
server.use(parser.urlencoded({extended:true}));
server.use(parser.json());

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if(err) {
    console.log(err);
    return;
  }

  server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
  });

  const db = client.db('saved-routes');
  console.log('Connected to database');

  server.post('/routes', function(req, res) {
    db.collection('routes').insert(req.body, function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }
      console.log('Saved to database');
      res.status(201);
      res.json(result.ops[0]);
    });
  });

  server.get('/routes', function(req, res) {
    db.collection('routes').find().toArray(function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(result);
    });
  });

  server.listen(3000, function () {
    console.log('Listening on port 3000');
  });
  //END
});
