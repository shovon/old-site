(function (window, document, undefined) { 
	window.Twitter = { };

	window.Twitter.generateTweetString = function (data) {
		var sampleTweet = $('#hidden-tweet-body').html();
		var tweetsBatch = '';
		
		tweetsBatch += '<div id="twitter-header" class="twitter-header"><div class="grid_12"><div class="inner"><h3><a href="http://twitter.com/TEDxYouthVAN" target="_blank">From Twitter...</a></h3></div></div></div><div class="clear"></div>'
		
		var parentObject = this;
		
		for (var i = 0; i < 4; i++)
		{
			var tweetId = data[i].id_str;
		
			tweetsBatch += sampleTweet
				
				.replace(/theTweet/, data[i].text.twitterify())
				
				.replace(/theMeta/, 
					'<a href="http://twitter.com/'
					+ data[i].user.screen_name + '/status/' 
					+ tweetId + '" target="_blank">'
					+ data[i].created_at.formatDate() + '</a>'
					+ ' - <a href="http://twitter.com/intent/tweet?in_reply_to='
					+ tweetId + '" target="_blank">reply</a>'
					+ ' - <a href="http://twitter.com/intent/retweet?tweet_id='
					+ tweetId + '" target="_blank">retweet</a>'
					+ ' - <a href="http://twitter.com/intent/favorite?tweet_id='
					+ tweetId + '" target="_blank">favourite</a>'
				);
		}
		
		return tweetsBatch + '<div class="clear"></div>';
	};
	
	window.Twitter.loadTweets = function (username) {
	
		$.ajax({
			url : 'https://twitter.com/status/user_timeline/' + username + '.json',
			data: {},
			dataType: "jsonp",
			timeout: 5000,
			success: function (data) {
				var tweets = Twitter.generateTweetString(data);
				$('#fancy-twitter-stream').html(tweets).animate({
					'height' : 'toggle',
					'opacity' : 'toggle'
				}, 1000);
			},
			
			error: function(XHR, textStatus, errorThrown) {
			}
		});
	
	};
})(this, this.document);