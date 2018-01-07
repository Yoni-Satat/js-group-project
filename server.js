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

  const db = client.db('list');

  console.log("connect to database");

  server.post('/api/bucketlist', function(req, res) {

    db.collection('bucketlist').insert( req.body, function(err, result) {
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

  server.get('/api/bucketlist', function(req, res) {

    db.collection('bucketlist').find().toArray(function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }

      res.json(result);
    });

  });


  server.delete('/api/bucketlist', function(req, res) {

    db.collection('bucketlist').remove({}, function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }

      res.status(204);
      res.send();
    });

  });

  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });
});
