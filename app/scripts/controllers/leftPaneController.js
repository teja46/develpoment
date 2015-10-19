// Left pane Controller for populating the feeds from Facebook
app.controller('leftPaneController',['$scope','feedsFactory','$filter','postFeedsFactory','$rootScope' ,function ($scope,feedsFactory,$filter,postFeedsFactory,$rootScope) {
	postFeedsFactory.getAuthResponse(function(data){
		feedsFactory.getFeeds(data[0].accessToken).then(onSuccessFunction,onErrorFunction);
		function onSuccessFunction (response){ 
			// This adds unique ID as a part of primary key to store data in Mongo DB
			for(key in response.data.data){
				var id =response.data.data[key].id.split("_");
				response.data.data[key]._id = id[0]+id[1];
			}
			$scope.filteredFeeds = response.data.data;
			// This returns the feeds which are being displayed with or without being filtered
		 	$scope.getData = function (filteredFeeds, feedSearch) { 
		      	$scope.queryData = $filter('filter')(filteredFeeds, feedSearch);
		    };
		    // Save feeds function first gets the saved feeds and compares it with the primary key and if the value is not present, then the data is being sent for insert operation
			$scope.saveFeeds = function(){
				var sendData = $scope.queryData;
				postFeedsFactory.getFeeds(function(data){
					var finalData = JSON.stringify(data);
					for(key in $scope.queryData){
						if(finalData.indexOf(sendData[key]._id)>=0){
							sendData.splice(key,1);
						}
					}
					if(sendData==""){
						alert("Data already present in Saved Feeds");
					} else{
						postFeedsFactory.postFeeds($scope.queryData,function(data){
							if(data.result && data.result.ok===1){
								$rootScope.$broadcast('retrieveFeeds');	
								console.log('success');				
						  	} else{
							  	console.log('error');
						  	}
						});
					}
				});
			}
		}
		// Error function which redirects to login page
		function onErrorFunction (response) {
			alert('Token expired, please try logging in again');
			window.location.href = '#/';
		}
	});
	
}]);