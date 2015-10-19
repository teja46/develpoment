// Factory for get and post feeds which sends URL based on the request made
app.factory('postFeedsFactory',['postFeedsService',function (postFeedsService) {
	return{
		postFeeds:function(feedData,callback){
			var url='/postFeeds';
			postFeedsService.post(url,feedData,callback);
		},
		getFeeds: function (callback) { 
			var url ='/getFeeds';				
			postFeedsService.get(url,callback);				
		},
		postAuthDetails: function(details,callback){
			var url = '/postLoginDetails';
			postFeedsService.post(url,details,callback);
		},
		getAuthResponse: function(callback){
			var url = '/getLoginDetails';
			postFeedsService.get(url,callback);
		}
	}
}]);
// Service for post and get operations on Mongo DB
app.service('postFeedsService',['$http',function($http){
	this.post = function(url,feedData,callback){
		$http.post(url,feedData).success(function(data){
			callback(data);
			return;
		}).error(function(err){
		 	callback(err);
		 	return;
	 	});
	};
	this.get = function (url,callback) {
     	$http.get(url).success(function(data){
			callback(data);
			return;				 
		 }).error(function(err){
		 	callback(err);
		 	return;
		 });
    };
}]);