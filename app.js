'use strict';
const express = require("express"),
    path = require('path'),
    swig = require('swig'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    assert = require('assert'),
    bodyParser = require('body-parser'),
    GoogleMapsAPI = require('googlemaps');


const app = express();

const routes = require('./routes/index.js');
// const api = require('./api/100nyu.js');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/css')));

app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });


var publicConfig = {
    key: 'AIzaSyDLUP1JCv3GRrsmfifX8dWY3jfQKtUSiFQ',
    stagger_time: 1000, // for elevationPath
    encode_polylines: false,
    secure: true // use https
};
var gmAPI = new GoogleMapsAPI(publicConfig);

let url = 'mongodb://user:123@ds059185.mlab.com:59185/heroku_k6td0nss';

var insertDocument = function(db, name, birth, death, city, callback) {
    db.collection('peoples').insertOne({
        "name": name,
        "birth": birth,
        "death": death,
        "city": city
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
        death = req.body.death,
        latitude = req.body.latitude,
        longitude = req.body.longitude,
        latlon = latitude+","+longitude,
        city;
    console.log(latlon);
    var reverseGeocodeParams = {
        "latlng": latlon,
        "result_type": "postal_code",
        "language": "en",
        "location_type": "APPROXIMATE"
    };

    gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result) {
        console.log(result);    
        city = result.results[0].address_components.slice(-2)[0].long_name;
    });
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, name, birth, death, city,
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
