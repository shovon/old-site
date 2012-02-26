(function (window, undefined) {
	
	if (window.twitterReader === undefined)
		window.twitterReader = {};
	
	if (window.TweetTemplateHolder === undefined)
	{
		/**
		 * This is a class specifically dedicated to holding the
		 * HTML value of a tag IDed as 'tweet-box'.
		 */
		window.twitterReader.TweetTemplateHolder = function() {
			this._tweetBox = $('#tweet-box').html();
		};
	
		/**
		 * Retrieves the HTML code that will be used as placeholders
		 * for tweets.
		 * 
		 * @returns a string with HTML code representing the placeholder
		 *          for tweets.
		 */
		window.twitterReader.TweetTemplateHolder.prototype.getTweetBox = function() {
			return this._tweetBox;
		};
	}
	
})(window);