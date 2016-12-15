var express = require("express");
var request = require("request");


var app = express();

// Put your skyscanner api key here
var api_key = "";


// This will serve up any static files in the public folder
app.use(express.static('public'));


// This allows Cross-Origin Requests to our server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Make sure everything works right
app.get('/', function(req, res){
    res.send("Hello world");
});

// Make a get call to the edamam api
// Make sure you set app_key and api_key up above
app.get('/api/skyscanner/:market/:locale/:location/:destination/:currency/:startdate/:enddate', function(req, res){
    var params = req.params;
    var market = (params.market) ? params.market : "GB";
    var locale = (params.locale) ? params.locale : "en-gb";
    var location = (params.location) ? params.location : "UK";
    var destination = (params.destination) ? params.destination : "anywhere";
    var currency = (params.currency) ? params.currency : "GBP";
    var startdate = (params.startdate) ? params.startdate : "anytime";
    var enddate = (params.enddate) ? params.enddate : "anytime";
    var responseData;
    request(
      { method: 'GET'
      , uri: 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/' + market + '/' + currency + '/' + locale + '/' + location + '/' + destination + '/' + startdate + '/' + enddate + '?apiKey=' + api_key
      , gzip: true
      }
    , function (error, response, body) {
        // body is the decompressed response body
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
        console.log('the decoded data is: ' + body);
        res.json(body);
    });

});

app.listen(3000, function(){
    console.log("Example app listening on port 3000!");
})
