var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var db=new (require('./dbconnect.js'))();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var options = {
    root: __dirname + '/socialapp/',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};
app.use(express.static('app'));
// This function posts feeds from left pane to Mongo DB
app.post('/postFeeds', function (req, res) {
	var query={
		'collection':'faceBookFeeds',
	};
   	query.query=req.body;
	db.insertData(query,function(err,data){
		console.log("data="+data);
		res.set('Content-Type', 'application/json');
		if(err){
			res.send(err);
			return;
		}
		res.send(data);
		return;
	});
});
// This function gets feeds from Mongo DB and gives it to right pane view
app.get('/getFeeds', function (req, res) {
  	var query={
		'collection':'faceBookFeeds',
	};	
	db.getData(query,function(err,data){
		console.log(data);
		res.set('Content-Type', 'application/json');
		if(err){
			res.send(err);
			return;
		}
		res.send(data);
		return;
	});	
});
// Makes the server run on port: 8080
app.listen(8080);
console.log("Listening to port 8080...");