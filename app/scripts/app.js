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