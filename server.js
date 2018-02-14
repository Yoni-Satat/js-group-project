const express = require('express');
const parser = require('body-parser');
const server = express();
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DataURL = process.env.MONGOLAB_URI;

server.use(express.static('client/build'));
server.use(parser.urlencoded({extended:true}));
server.use(parser.json());


MongoClient.connect(DataURL, function(err, client) {
  if(err) {
    console.log(err);
    return;
  }

  const db = client.db('routes');

  console.log("connect to database");

  server.post('/api/routes', function(req, res) {

    db.collection('fav_routes').insert( req.body, function(err, result) {
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

  server.get('/api/routes', function(req, res) {

    db.collection('fav_routes').find().toArray(function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }
      res.json(result);
    });
  });

  server.delete('/api/routes', function(req, res) {
    db.collection('fav_routes').remove({}, function(err, result) {
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

  server.delete('/api/routes/:id', function(req, res) {
    db.collection('fav_routes').deleteOne({_id: new ObjectID(req.params.id)}, function(err, success) {
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

  server.put('/api/routes/:id', function(req, res) {
    db.collection('fav_routes').update({_id: new ObjectID(req.params.id)}, {$set: req.body}, function(err, success) {
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
