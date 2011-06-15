(function(undefined) {
	
	// TWEET TEMPLATE HOLDER CLASS
	
	/**
	 * This is a class specifically dedicated to holding the
	 * HTML value of a tag IDed as 'tweet-box'.
	 */
	function TweetTemplateHolder() {
		this.tweetBox = $('#tweet-box').html();
	};
	
	/**
	 * Retrieves the HTML code that will be used as placeholders
	 * for tweets.
	 * 
	 * @returns a string with HTML code representing the placeholder
	 *          for tweets.
	 */
	TweetTemplateHolder.prototype.getTweetBox = function() {
		return this.tweetBox;
	};
	
	// -----------------------------------
	
	/**
	 * Will be used to hold HTML code that will
	 * be used as a placeholder for a tweet.
	 */
	var tweetTemplate;
	
	/**
	 * This will allow a string to have all its plain-text urls,
	 * mentions, and hashtags converted into hyper-links, just
	 * like a real tweet.
	 * 
	 * @returns a string converted into a twitter style a tweet.
	 */
	String.prototype.twitterify = function() {
		
		return this. // Wait! There's more below!
		
		 // Replace all instances of all plain-text URL with
		 // a hyperlink.
		 replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
				"<a href='$1'>$1</a>")
		 
		 // Replace all instances of of a mention with a URL
		 // to the mentioned username.
		.replace(/(\B@(\w|[a-b]|\d|_){1,15})/gi, 
		function(u) {
			var username = u.replace('@', '');
			return '<a href="http://twitter.com/' + username + '">' + u + '</a>';
		})
		
		 // Replace all hashtags with a URL to the hashtag's
		 // search page.
		.replace(/(\B#(\w|[a-b]|\d|_)+)/gi, function(h) {
			var hashtag = h.replace('#', '');
			return '<a href="http://twitter.com/search?q=%23' + hashtag + '">' + h +'</a>';
		});
	};
	
	/**
	 * Retrieve a JSON file from the specified URL, and execute
	 * an event handler after doing so.
	 */
	function readJSON(location, onRetrieval) {		
		$.ajax({
			url : location,
			data: {},
			dataType: "jsonp",
			timeout: 10000,
			success: onRetrieval,
			error: function(XHR, textStatus, errorThrown) {
				
			}
		});
	}
	
	function clearTweets(message) {
		$('#tweets').html('<div class="loading-box">' 
				+ (message == undefined ? 
				  'Please wait while tweets load.<div class="spinner"><img src="img/ajaxloader.gif"></spinner>' 
				  : message) + '</div>');
	}
	
	/**
	 * Saturate the tag IDed as 'tweets', with tweets retrieved
	 * from twitter..
	 */
	function updateTweets() {
		
		clearTweets();
		
		if ($('#search-term').attr('value') === '') {
			clearTweets('Please enter something in the search bar.');
			return;
		}
		
		// Search for tweets.
		readJSON("https://twitter.com/search.json?q=" + 
					encodeURIComponent($('#search-term').attr('value')), function(data) {
			
			if (data.results.length == 0)
			{
				clearTweets('There are no tweets for "' + $('#search-term').attr('value') + '".</div>');
				return;
			}
			
			$('#tweets').html('');
			
			var i = 0;
			// Loop through each tweet.
			$.each(data.results, function(i, item) {
				
				// Append a tweetbox.
				$('#tweets').append((function(){
					
					return tweetTemplate.getTweetBox()
					
							// Give the tweet the profile picture.
					       .replace(/theImageHere/, item.profile_image_url)
					       
					       // Give the tweet's profile picture image an
					       // 'alt' text.
					       .replace(/alternativeText/, '@' + item.from_user)
					       
					       // Give th tweet the username.
					       .replace(/username/g, '<a href="http://twitter.com/' 
					    		   + item.from_user  +'">' + item.from_user + '</a>')
					       
					    	// Give teh tweet the body.
			    		   .replace(/theTweet/, item.text.twitterify())
			    		   
			    		   // Finally, give it the timestamp.
					       .replace(/theDate/, '<a href="http://twitter.com/' 
					    		   + item.from_user + '/status/' + item.id + '">' 
					    		   + item.created_at + '</a>');
					
				})());
			});
		});
	}
	
	/**
	 * Returns a random integer between min and max
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	// The script's beating heart.
	(function(undefined) {
		
		$('body').ready(function() {
			tweetTemplate = new TweetTemplateHolder();
			
			clearTweets();
			
			readJSON('https://api.twitter.com/1/trends.json', function(data) {
				$('#search-term').attr('value', 
						data.trends[Math.floor(Math.random() * (data.trends.length))].name);
				
				updateTweets();
			});
		});
		
		$("#search-term").keyup(function(event){
			if(event.keyCode == 13){
				$("#search-button").click();
			}
		});
		
		$('#search-button').click(function() {
			updateTweets();
		});
	})();
	
})();