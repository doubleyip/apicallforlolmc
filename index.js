var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var request = require('request');
var async = require('async');
var cors=require('cors');

app.use(cors({origin: '*'}));		//enable allow access origin control
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');
app.get('/',function(req,res){
	res.render('index');
});

app.get('/sumSearch', function(req, res) {	//call for summoner searching	
  var data = {};				//?name="name you want to search"
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
      info: json			//retuurn the json
	  
    })*/
	res.status(200).json(newjson);
  });
});

app.get('/matchSearch', function(req, res) {		//api call to search for a match
  var data = {};					//?id="id of match to search
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

app.get('/recentSearch', function(req, res) {		//search recent matches
  var data = {};					//?rmatch="match to search"
  var server = 'na';
  var apiKey = 'RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
  var recentMatch = req.query.rmatch;
  var URL = 'https://na1.api.riotgames.com/lol/match/v3/matches/' + recentMatch + '?api_key=RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
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
  var apiKey = 'RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
  var recentMatch = req.query.rmatch;
  var URL = 'https://na1.api.riotgames.com/lol/match/v3/timelines/by-match/' + recentMatch + '?api_key=RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
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
  var apiKey = 'RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
  var sumID = req.query.id;
  var URL = 'https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/' + sumID + '?api_key=RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
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
  var apiKey = 'RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
  var championID = req.query.champID;
  var URL = 'https://na1.api.riotgames.com/lol/static-data/v3/champions/' + championID + '?locale=en_US&api_key=RGAPI-c16c2668-0913-4123-9416-113f700d30f0';
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
  var URL = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';
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
