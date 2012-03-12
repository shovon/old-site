window.jsonpRequest = (url, callback) ->
	functionNameGen = ->
		S4 = ->
			(((1+Math.random())*0x10000)|0).toString(16).substring(1);

		return 'shovon' + (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());

	callbackName = functionNameGen();
	query = "#{url}&callback=#{callbackName}"

	bodyTag = document.getElementsByTagName('body')[0]

	# Create a script tag to make the JSONP request.
	scriptTag = document.createElement 'script'
	scriptTag.setAttribute 'type', 'text/javascript'
	scriptTag.setAttribute 'src', query

	window[callbackName] = (data) ->
		callback.call(window, data)
		delete[callbackName]
		bodyTag.removeChild scriptTag

	bodyTag.appendChild scriptTag