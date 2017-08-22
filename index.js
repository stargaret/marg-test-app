require('dotenv').config();
var express = require('express');
var request = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/install', function(request,response) {
  response.render('pages/install');
});

app.post('slack-do-something', function(request, response) {
  response.send('gotcha');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
