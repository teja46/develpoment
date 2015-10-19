// Right pane Controller for populating the feeds from Mongo DB
app.controller('rightPaneController',['$scope','$rootScope','postFeedsFactory',function($scope,$rootScope,postFeedsFactory){
	// This function returns the feeds that were stored earlier in Mongo DB
	postFeedsFactory.getFeeds(function(data){
		$scope.savedFilteredFeeds = data;
	});
	// This function returns the feeds that were stored in Mongo DBafter the feeds are being saved from left pane
	$rootScope.$on('retrieveFeeds',function(){
		postFeedsFactory.getFeeds(function(data){
			$scope.savedFilteredFeeds = data;
		});		
	});
}]);