$(function() {
	$(document).mousemove(function(e)
	{	
		$('#tooltip').css({
		
			// The tooltip's X position.
			'left' : (
				// if...
				e.pageX - 2 + $('#tooltip').width() > $(window).width() ?
					// then...
					e.pageX + 2 - $('#tooltip').width() :
					// else...
					e.pageX - 2
				).toString() + 'px',
			
			// The tooltip's Y position.
			'top' : (e.pageY + 23).toString() + 'px' 
		 });
	});
	
	$('.tooltip-item').hover(
		function()
		{
			$('#tooltip').html($(this).attr('tooltip-text'));
			var width = $(this).attr('tooltip-width');
			if (width != 'undefined') $('#tooltip').css( { 'width' : width } );
			$('#tooltip').fadeIn(100);
		},
		
		function()
		{
			$('#tooltip').fadeOut(100);
		}
	);
	
	$(document).ready(function()
	{
		$('body').append('<div id="tooltip">This is a test.</div>');
	});
});