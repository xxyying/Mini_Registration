var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://admin:admin@ds139735.mlab.com:39735/username-pwd', 
						function(err, database) {
  // ... start the server
	if (err) {
		return console.log(err);
	}
  	db = database;
  	app.listen(3000, function(){
    console.log('listening on 3000');
  });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	console.log("get successfully...")
	db.collection('adduser').find().toArray(function(err, result) {
  	if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', {adduser: result});
	});
});

app.post('/adduser', function(req, res) {
	console.log("post successfully...")
   	db.collection('adduser').save(req.body, function(err, result){
    if (err) {
    	return console.log(err);
    };
    console.log(req.body);
    console.log('saved to database');
    console.log(__dirname);
    res.redirect('/');
  });
});


