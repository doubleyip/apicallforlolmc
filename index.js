var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var request = require('request');
var async = require('async');
var cors=require('cors');
var apiKey = 'RGAPI-5ebafcd2-9cc9-4779-b9f1-a6ec913f49a7';

app.use(cors({origin: '*'}));		//enable allow access origin control
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'handlebars');
app.get('/',function(req,res){
	res.render('index');
});

app.get('/sumSearch', function(req, res) {	//call for summoner searching	
  var data = {};				//?name="name you want to search"
  var server = 'na';
  var sumSearch = req.query.name;
  var URL = 'https://'+server+'1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + sumSearch + '?api_key=' + apiKey;
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
      info: json			//return the json
	  
    })*/
	res.status(200).json(newjson);
  });
});

app.get('/matchSearch', function(req, res) {		//api call to search for a match
  var data = {};					//?id="id of match to search
  var server = 'na';
  var accountID = req.query.id;
  var URL = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/'+ accountID +'?api_key=' + apiKey;
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

app.get('/recentSearch', function(req, res) {		//search recent matches
  var data = {};					//?rmatch="match to search"
  var server = 'na';
  var recentMatch = req.query.rmatch;
  var URL = 'https://na1.api.riotgames.com/lol/match/v4/matches/' + recentMatch + '?api_key=' + apiKey;
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

app.get('/getTimeline', function(req, res) {		//call to get timeline
  var data = {};					//?rmatch="match you want to get timeline of"
  var server = 'na';
  var recentMatch = req.query.rmatch;
  var URL = 'https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/' + recentMatch + '?api_key=' + apiKey;
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


app.get('/getLeague', function(req, res) {		//api call to get league of player
  var data = {};					//?id="id of player you want to get league of"
  var server = 'na';
  var sumID = req.query.id;
  var URL = 'https://na1.api.riotgames.com/lol/league/v4/positions/by-summoner/' + sumID + '?api_key=' + apiKey;
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

app.get('/getChamp', function(req, res) {		//api to get champ
  var data = {};					//?champID="id of champ you want to search"
  var server = 'na';
  var championID = req.query.champID;
  var URL = 'https://na1.api.riotgames.com/lol/static-data/v3/champions/' + championID + '?locale=en_US&'+'&api_key=' + apiKey;
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

app.get('/getChamppic', function(req, res) {	//api call to get champ icons
  var data = {};
  var URL = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';
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
