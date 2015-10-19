// This uses facebook api and logs using facebook account
app.controller('fbLoginController',['$scope','feedsFactory','postFeedsFactory', function($scope,feedsFactory,postFeedsFactory){
	$scope.fbLogin = function(){
		FB.login(function(response) {
		    if (response.authResponse) {
		     	console.log('Welcome!  Fetching your information.... ');
		     	FB.api('/me/?fields=picture,name', function(response) {
		       		console.log('Good to see you!!');
		       		console.log(response);
		       		var details = response;
		       		details.accessToken = FB.getAuthResponse().accessToken;
		       		postFeedsFactory.postAuthDetails(details,function(data){
						if(data.result && data.result.ok===1){
							console.log('success');
							window.location.href = '#/home';	
					  	} else{
						  	console.log('error');
					  	}
					});
		     	});
		    } else {
		     	console.log('User cancelled login or did not fully authorize.');
		    }
		});
	}
}]);