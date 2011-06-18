(function (window, undefined) {
	
	/**
	 * The twitter reader namespace.
	 */
	if (window.twitterReader === undefined)
		window.twitterReader = {};
	
	if (window.twitterReader.MainUI === undefined)
		window.twitterReader.MainUI = {};
	
	window.twitterReader.MainUI.lastSearchTerm = '';
	twitterReader.tweets.lastBatchOfTweets = new Array();
	
	/**
	 * The message to tell people that the script is
	 * doing its work correctly.
	 */
	window.twitterReader.MainUI.loadingMessage = 
		'Please wait while tweets load.<div class="spinner"><img src="img/ajaxloader.gif"></spinner>';
	
	/**
	 * Erases all the tweets from the stream
	 */
	window.twitterReader.MainUI.clearTweets = function () {
		$('#tweets').html('');
	};
	
	/**
	 * Display a message.
	 * 
	 * @param message: the message to display.
	 * @throws an error, when 'message' is undefined.
	 */
	window.twitterReader.MainUI.displayMessage = function (message) {
		if (message === undefined || message === '')
			throw 'You haven\'t specified any message.';
		
		$('#message-bar').show();
		$('#message-bar').html(message);
	};
	
	/**
	 * Hide the message currently being displayed.
	 */
	window.twitterReader.MainUI.hideMessage = function () {
		$('#message-bar').hide();
	};
	
	/**
	 * Generate a tweet message with all the plain-text URL's, 
	 * hashtags and mentions converted into hyperlinks.
	 * 
	 * @param data
	 */
	window.twitterReader.MainUI.generateTweetString = function (data) {
		var tweetsBatch = '';
		
		// Loop through each tweet.
		$.each(data, function(i, item) {
			
			tweetsBatch += twitterReader.MainUI.tweetTemplate.getTweetBox()
				
						// Give the tweet the profile picture.
				       .replace(/theImageHere/, item.profile_image_url)
				       
				       // Give the tweet's profile picture image an
				       // 'alt' text.
				       .replace(/alternativeText/, '@' + item.from_user)
				       
				       // Give the tweet the username.
				       .replace(/username/g, '<a href="http://twitter.com/' 
				    		   + item.from_user  +'" target="_blank">' + item.from_user + '</a>')
				       
				    	// Give teh tweet the body.
		    		   .replace(/theTweet/, item.text.twitterify())
		    		   
		    		   // Finally, give it the timestamp.
				       .replace(/theDate/, '<a href="http://twitter.com/' 
				    		   + item.from_user + '/status/' + item.id + '">' 
				    		   + item.created_at + '</a>');
		});
		
		return tweetsBatch;
	};
	
	/**
	 * Saturate the tag IDed as 'tweets', with tweets retrieved
	 * from twitter.
	 */
	window.twitterReader.MainUI.updateTweets = function () {
		
		// Determine if anything has been entered
		// into the search bar.
		if ($('#search-term').attr('value') === '') 
		{
			twitterReader.MainUI.clearTweets();
			twitterReader.MainUI.displayMessage('Please enter something in the search bar.');
			return;
		}
		
		// If the search bar's value is set differently
		// clear out the tweets, and display a loading message.
		if (twitterReader.MainUI.lastSearchTerm !== $('#search-term').attr('value'))
		{
			twitterReader.MainUI.clearTweets();
			twitterReader.MainUI.displayMessage(twitterReader.MainUI.loadingMessage);
		}
		
		// Now query for the tweets, and read the JSON data that
		// twitter sends.
		twitterReader.AJAX.readJSON("https://twitter.com/search.json?q=" + 
					encodeURIComponent($('#search-term').attr('value')), function(data) {
			
			// If there were nothing produced, display a friendly
			// message, and do nothing afterwards.
			if (data.results.length === 0)
			{
				twitterReader.displayMessage('There are no tweets for "' + $('#search-term').attr('value') + '".</div>');
				return;
			}
			
			var nextBatchOfTweets = (function() {
				if (twitterReader.lastSearchTerm === $('#search-term').attr('value'))
					return twitterReader.tweets.loadNextBatchOfTweets(data.results);
				else
				{
					twitterReader.MainUI.lastSearchTerm = $('#search-term').attr('value');
					return data.results;
				}
			})();

			$('#tweets').prepend(twitterReader.MainUI.generateTweetString(nextBatchOfTweets));
			
			twitterReader.tweets.lastBatchOfTweets = 
				nextBatchOfTweets.concat(twitterReader.tweets.lastBatchOfTweets);
			twitterReader.MainUI.hideMessage();
		});
	};
	
})(window);