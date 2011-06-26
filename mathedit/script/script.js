(function(window, undefined){
	
	String.prototype.handleLatex = function() {
		return this.replace(/\$\$.+\$\$/g, function(tex) {
			return tex.replace(/(\r\n|\r|\n)/g, ' ')
		});
	};
	
	String.prototype.convertH1 = function() {
		return this.replace(/\#.+/g, function(header) {
			return '<h1>' + header.replace(/#(\s+)?/, '') + '</h1>';
		});
	}
	
	String.prototype.convertH2 = function() {
		return this.replace(/\#\#.+/g, function(header) {
			return '<h2>' + header.replace(/#+(\s+)?/, '') + '</h2>';
		});
	}
	
	String.prototype.convertH3 = function() {
		return this.replace(/\#\#\#.+/g, function(header) {
			return '<h3>' + header.replace(/#+(\s+)?/, '') + '</h3>';
		});
	}
	
	String.prototype.handleHeaders = function() {
		return this.convertH3().convertH2().convertH1();
	};
	
	String.prototype.toParagraphs = function() {
		return '<p>' + this.replace(/\r\n?|\n/g, '<br>').replace(/<br>\s*<br>/g, '</p><p>') + '</p>';
	};
	
	String.prototype.addPages = function() {
		return this.replace(/@@@@/g, '</div><div class="assign-page">')
	};
	
	$('#editor').bind('textchange', function() {
		$('#view-area').html('<div class="assign-page">' + $(this).val().handleLatex().handleHeaders().toParagraphs().addPages() + '</div>');
	});
	
	$('#update-math').click(function() { MathJax.Hub.Typeset(); });
	
	$('#window').draggable();

})(window);