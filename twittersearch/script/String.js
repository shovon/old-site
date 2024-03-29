(function(window, undefined) {
	
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
				'<a href="$1" target="_blank">$1</a>')
		 
		 // Replace all instances of of a mention with a URL
		 // to the mentioned username.
		.replace(/(\B@(\w|[a-b]|\d|_){1,15})/gi, 
		function(u) {
			var username = u.replace('@', '');
			return '<a href="http://twitter.com/' + username + '" target="_blank">' + u + '</a>';
		})
		
		 // Replace all hashtags with a URL to the hashtag's
		 // search page.
		.replace(/(\B#(\w|[a-b]|\d|_)+)/gi, function(h) {
			var hashtag = h.replace('#', '');
			return '<a href="http://twitter.com/search?q=%23' + hashtag + '" target="_blank">' + h +'</a>';
		});
	};
	
})(window);