(function (window, document, undefined) { 
	Twitter.loadTweets('TEDxYouthVAN');
	
	$(function () {
		$('#share-buttons').mouseenter(function () {
		
			$('#share-info').fadeIn(200);
		
		}).mouseleave(function () {
			$('#share-info').fadeOut(200);
		});
	});
})(this, this.document);