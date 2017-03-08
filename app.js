'use strict';
const express = require("express");
const path = require('path');
const swig = require('swig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const bodyParser = require('body-parser');



const app = express();

const routes = require('./routes/index.js');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/css')));

app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });



let url = 'mongodb://user:123@ds059185.mlab.com:59185/heroku_k6td0nss';

var insertDocument = function(db, name, birth, death, callback) {
    db.collection('peoples').insertOne({
        "name": name,
        "birth": birth,
        "death": death
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the peolpes collection.");
    });
};

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/peoples', function(req, res, next) {
    console.log('Quested');
    var name = req.body.name,
        birth = req.body.birth,
        death = req.body.death;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, name, birth, death,
            function() {
                db.close();
            });
    });
});

app.get('/draw', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('peoples').aggregate(
            [
                { "$group": { "_id": { name: "$name", birth: "$birth", death: "$death" } } }
            ]
        )
        cursor.get(function(err, results) {
            res.json(results);
            db.close();
        });
    })
})
routes(app);
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on the port ' + port);
});
