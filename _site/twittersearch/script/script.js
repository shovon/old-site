(function(window, undefined) {
	
	// ON PAGE READY
	
	$('body').ready(function() {
		
		// Retrieve the template placeholder for a tweet.
		twitterReader.MainUI.tweetTemplate = new twitterReader.TweetTemplateHolder();

		// Clear the screen with the loading message.
		twitterReader.MainUI.displayMessage(twitterReader.MainUI.loadingMessage);
		
		// Twitter is more than just tweets. It also displays
		// the top trending topics discussed in tweets. So
		// not only will we be retrieving tweets, we will
		// also be retrieving the hottest trends that people
		// are talking.
		
		// Retrieve the top-trending topics. If things fail, attempt
		// to load tweets anyways.
		twitterReader.AJAX.readJSON('https://api.twitter.com/1/trends.json', function(data) {
			
			// Once successful, set the search bar's value
			// to a randomly selected trending topic.
			$('#search-term').attr('value', 
					data.trends[Math.getRandomInt(0, data.trends.length)].name);
			
			// Create the tag that will hold all of the
			// trending tweets.
			$('#top-tweets-bar').html('Top tweets <span id="top-tweets"></span>');
			
			// Output the trending tweets.
			$.each(data.trends, function(i, item) { 
				$('#top-tweets').append('<button class="top-tweet minor">' + item.name + '</button>&nbsp;');
			});
			
			// Attach a click event to each of the top
			// tweet labels.
			$('.top-tweet').click(function() {
				$('#search-term').attr('value', $(this).html());
				twitterReader.MainUI.updateTweets();
			});
				
			// Now try to retrieve the tweets.
			twitterReader.MainUI.updateTweets();
		},
		
		// And this is the function that will handle errors.
		function(jqXHR, textStatus, errorThrown) {
			// Set the search bars value to the term
			// "twitter."
			$('#search-term').attr('value', 'twitter');
			
			// Now update the tweets.
			twitterReader.MainUI.updateTweets();
		});
	});
	
	// ON SEARCH TERM TEXTBOX ENTER KEY PRESS
	
	$('#search-term').keyup(function(event){
		console.log('Key-up event called');
	
		if(event.keyCode == 13)
			twitterReader.MainUI.updateTweets();
	});
	
	// ON SEARCH BUTTON CLICK
	
	$('#search-button').click(function() {
		console.log('Click event called');
	
		twitterReader.MainUI.updateTweets();
	});
	
})(window);