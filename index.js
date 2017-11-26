var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var request = require('request');
var async = require('async');
var cors=require('cors');

app.use(cors({origin: '*'}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');
app.get('/',function(req,res){
	res.render('index');
});

app.get('/sumSearch', function(req, res) {
  var data = {};
  var server = 'na';
  var apiKey = 'RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
  var sumSearch = req.query.name;
  var URL = 'https://'+server+'1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + sumSearch + '?api_key=' + apiKey;
  console.log(URL);

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var json = JSON.parse(body);
		  newjson=json
          callback(null, data);
        } else {
          console.log(err);
        }
      });
    }
  ],
  function(err, data) {
    if(err) {
      console.log(err);
      return;
    }

    /*res.render('index', {
      info: json
	  
    })*/
	res.status(200).json(newjson);
  });
});

app.get('/matchSearch', function(req, res) {
  var data = {};
  var server = 'na';
  var apiKey = 'RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
  var accountID = req.query.id;
  var URL = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/'+ accountID + '/recent?api_key=RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
  console.log(URL);

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var json = JSON.parse(body);
		  newjson=json
          callback(null, data);
        } else {
          console.log(err);
        }
      });
    }
  ],
  function(err, data) {
    if(err) {
      console.log(err);
      return;
    }

    /*res.render('index', {
      info: json
	  
    })*/
	res.status(200).json(newjson);
  });
});

var port = Number(process.env.PORT || 3000);
app.listen(port);
