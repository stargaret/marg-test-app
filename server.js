// require the dependencies we installed
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var responseTime = require('response-time')
var axios = require('axios');
var redis = require('redis');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

// set up the response-time middleware
app.use(responseTime());

// create a new redis client and connect to our local redis instance
var client = redis.createClient();

var router = express.Router();
//middleware to use for all requests

router.use(function(req, res, next) {
    // do logging
    console.log(req.url);
    console.log(req.body);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'this is my test app!' });   
});

router.route('/slack')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        challenge = req.body.challenge;  // set the bears name (comes from the request)
        res.json({ "challenge": challenge });

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});



// if a user visits /api/slack
// app.post('/api/slack/:thing', function(req, res) {
//   var thing = req.params.thing;
//   var challenge = req.params.challenge;
//   res.send({"challenge": challenge });
// });

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});