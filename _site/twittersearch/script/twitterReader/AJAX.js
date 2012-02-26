(function(window, undefined) {
	/**
	 * The twitterReader namespace.
	 */
	if (window.twitterReader === undefined)
		window.twitterReader = {};
	
	/**
	 * The twitterReader.AJAX namespace.
	 */
	if (window.twitterReader.AJAX === undefined)
		window.twitterReader.AJAX = {};
	
	/**
	 * Retrieve a JSON file from the specified URL, and execute
	 * an event handler after doing so.
	 */
	window.twitterReader.AJAX.readJSON = function (location, onRetrieval, onError) {		
		$.ajax({
			url : location,
			data: {},
			dataType: "jsonp",
			timeout: 5000,
			success: onRetrieval,
			error: (function() {
				if (onError === undefined)
				{
					return function(XHR, textStatus, errorThrown) {
						twitterReader.displayMessage('Twitter seems to be having a "Fail Wail" right now. Come back another time.'); 
					};
				}
				
				return onError;
			})()
		});
	};
})(window);