// This sets the progile Picture and logout functionality for the home Page
app.controller('homePageController',['$scope','postFeedsFactory',function($scope,postFeedsFactory){
	postFeedsFactory.getAuthResponse(function(data){
		console.log(data[0]);
		$scope.userName = data[0].name;
		$scope.profilePicture = data[0].picture.data.url;
		$scope.logoutUser = function(){
			var logout = confirm("Are you sure you want to logout?");
			if(logout){
				FB.logout(function(response) {
					alert("You have been logged out now!");
				  	window.location.href = '#/';
				});
			}
		}
	});
}]);