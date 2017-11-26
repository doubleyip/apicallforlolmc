var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var request = require('request');
var async = require('async');
var cors=require('cors');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors({origin: null}));
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
	res.status(404).json(newjson);
  });
});

var port = Number(process.env.PORT || 3000);
app.listen(port);
