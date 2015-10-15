var app = angular.module('socialApp',['ngRoute']);
app.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/login.html',
	        controller: 'fbLoginController'
		})
		.when('/home', {
        	templateUrl: 'views/homePage.html',
        	controller: 'homePageController'
      	})
}]);
window.fbAsyncInit = function() {
    FB.init({
      appId      : '766511990125399',//appId needs to be given for the app which has been created in developers.facebook.com
      xfbml      : true,
      version    : 'v2.4'
    });
};

(function(d, s, id){
 	var js, fjs = d.getElementsByTagName(s)[0];
 	if (d.getElementById(id)) {return;}
 	js = d.createElement(s); js.id = id;
 	js.src = "//connect.facebook.net/en_US/sdk.js";
 	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

app.controller('fbLoginController',['$scope','feedsFactory', function($scope,feedsFactory){
	$scope.fbLogin = function(){
		FB.login(function(response) {
		    if (response.authResponse) {
		     	console.log('Welcome!  Fetching your information.... ');
		     	FB.api('/me', function(response) {
		       		console.log('Good to see you, ' + response.name + '.');
		       		console.log(response);
		       		var accessToken = FB.getAuthResponse().accessToken;
		       		feedsFactory.setAccessToken(accessToken);
		       		window.location.href = '#/home';
		     	});
		    } else {
		     	console.log('User cancelled login or did not fully authorize.');
		    }
		});
	}
}]);
app.controller('homePageController',['$scope','feedsFactory',function($scope,feedsFactory){
}]);
// Left pane Controller for populating the feeds from Facebook
app.controller('leftPaneController',['$scope','feedsFactory','$filter','postFeedsFactory','$rootScope' ,function ($scope,feedsFactory,$filter,postFeedsFactory,$rootScope) {
	feedsFactory.getFeeds(feedsFactory.accessToken).then(onSuccessFunction,onErrorFunction);
	function onSuccessFunction (response) {
		for(key in response.data.data){
			// response.data.data[key]._id = parseInt(key);
		}
		// console.log(response.data.data);
		$scope.filteredFeeds = response.data.data;

		// This returns the feeds which are being displayed with or without being filtered
	 	$scope.getData = function (filteredFeeds, feedSearch) {
	      	$scope.queryData = $filter('filter')(filteredFeeds, feedSearch);
	    };
		$scope.saveFeeds = function(){
			postFeedsFactory.postFeeds($scope.queryData,function(data){
				if(data.result && data.result.ok===1){
					$rootScope.$broadcast('retrieveFeeds');	
					console.log('success');				
			  	} else{
				  	console.log('error');
			  	}
			});
		}
	}
	function onErrorFunction (response) {
		alert('Token expired, please try logging in again');
		window.location.href = '#/';
	}
}]);
// Right pane Controller for populating the feeds from Mongo DB
app.controller('rightPaneController',['$scope','$rootScope','postFeedsFactory',function($scope,$rootScope,postFeedsFactory){
	// This function returns the feeds that were stored before in Mongo DB
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
// The custom directive has been implemented for the feeds which doesn't show any images such that the default image needs to be provided
app.directive('checkImage', function ($q) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('ngSrc', function (ngSrc) {
                var deferred = $q.defer();
                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                    element.attr('src', 'images/dummy1.jpg'); // sets the default image
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = ngSrc;
                return deferred.promise;
            });
        }
    };
});