// This is being used to retrieve feeds from Facebook
app.factory('feedsFactory',function($http){
	return{
		getFeeds : function(accessToken){
			var pageId = '110106192432427';
			//Every page has been given a seperate pageId, please refer readme document for more information
			var url = 'https://graph.facebook.com/v2.2/'+pageId+'/feed?access_token='+accessToken;
			return $http.get(url);
		},
		// This has been used to set access token for rss feeds population
		setAccessToken: function(accessToken){
			this.accessToken = accessToken;
		}
	}
});