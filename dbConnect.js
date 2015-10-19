var MongoClient = require('mongodb').MongoClient;
 
// Connection URL 
var url = 'mongodb://localhost:27017/socialApp';
var options = {
  "sort": [['status','asc'],['createdDate','asc']],
  "limit": 10,
  "skip": 0
};
// Use connect method to connect to the Server 
var db = function(){
	var self = this;
	self.connect =function(callback){
		MongoClient.connect(url, function(err, db) {
		 	if(err){
				callback(err);
			return;	 
		 	}
		 	callback(err,db);
		 	return; 
	});
};
	// This function returns data from Mongo to right pane
	self.getData = function(query,callback){
		var getResponse=function(err,dbCon){
			if(err){
				callback(err);
				return;
			}
			console.log(query);
			var collection = dbCon.collection(query.collection);
			
			collection.find(query.query).toArray(function(err, docs) {	
				callback(err,docs);
				dbCon.close();
			});
			
		}
		self.connect(getResponse);
	};
	// This function inserts data from left pane to Mongo 
	self.insertData = function(query,callback){
		var getResponse=function(err,dbCon){
			if(err){
				callback(err);
				return;
			}
			// console.log(JSON.stringify(query.query));
			var collection = dbCon.collection(query.collection);
			collection.insert(query.query ,function(err, docs) {
				callback(err,docs);
				dbCon.close();
			});
			
		}
		self.connect(getResponse);
	};
	// This function saves the login details of the user
	self.saveLoginDetails = function(query,callback){
		var getResponse=function(err,dbCon){
			if(err){
				callback(err);
				return;
			}
			var collection = dbCon.collection(query.collection);
			collection.find({id: query.query.id}).toArray(function (err, result) {
		      	if (result.length==0) {
		        	collection.insert(query.query ,function(err, docs) {
						callback(err,docs);
						dbCon.close();
					});
		      	} else {
		        	collection.remove({});
		        	collection.insert(query.query ,function(err, docs) {
						callback(err,docs);
						dbCon.close();
					});
		      	}
		    });
		}
		self.connect(getResponse);
	};
};
module.exports = db;