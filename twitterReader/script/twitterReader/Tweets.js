(function (window, undefined) {
	/**
	 * The twitterReader namespace.
	 */
	if (window.twitterReader === undefined)
		window.twitterReader = {};
	
	/**
	 * The twitterReader.AJAX namespace.
	 */
	if (window.twitterReader.tweets === undefined)
		window.twitterReader.tweets = {};
	
	window.twitterReader.tweets.lastBatchOfTweets = new Array();
	
	window.twitterReader.tweets.loadNextBatchOfTweets = function (data) {
		// What we are innitally trying to do is unite both the previous batch
		// of tweets with the next batch of tweets.
		
		// But to do this, we are first going to have to retrieve a 'stop' index;
		// that is look for an index where all the data from the last batch of
		// tweets start interesecting with the next set of tweets.
		
		// And yes, that means we are assuming that previous tweets and incoming
		// tweets are in chronological order (which, I at least hope, twitter
		// took the time to prepare that data in that manner).
		return (function() {
			if (twitterReader.tweets.lastBatchOfTweets.length !== 0)
			{
				return (function(data) {
					var stopIndex = (function () {
						var arrayLength = data.length;
						
						for (var i = 0; i < arrayLength; i++)
						{
							if (data[i].id === twitterReader.tweets.lastBatchOfTweets[0].id)
								return i;
						}
						
						return arrayLength;
					})();
					
					var setDifferenceArray = new Array();
					for (var i = 0; i < stopIndex; i++)
						setDifferenceArray.push(data[i]);
					
					return setDifferenceArray;
				})(data);
			}
			
			return data;
		})();
	};
})(window);