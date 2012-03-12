convertLinks = (text) ->
	return text.replace(
		/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
		'<a href="$1" target="_blank">$1</a>')

convertUsernames = (text) ->
	return text.replace(
		/(\B@(\w|[a-b]|\d|_){1,15})/gi,
		(u) ->
			username = u.replace('@', '')
			return "<a href=\"http://twitter.com/#{username}\" target=\"_blank\">#{u}</a>"
	)

convertHashtags = (text) ->
	return text.replace(/(\B#(\w|[a-b]|\d|_)+)/gi,
		(h) ->
			hashtag = h.replace('#', '')
			return "<a href=\"http://twitter.com/search?q=%23#{hashtag}\" target=\"_blank\">#{h}</a>"
	)

twitterQuery = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=false&screen_name=shovon_rahman&count=4'

tweets = ""
jsonpRequest twitterQuery, (data) ->
	for tweet, i in data
		# The class to apply to the tweet box. Since each box will need different CSS styling
		tweetClass = if i is 0 then "first_column body_column" else if i is 3 then "last_column body_column" else "body_column"

		# Format the time. Twitter provides one style, and we want it in another way.
		timeText = dateFormat new Date(tweet.created_at), "mmmm d, yyyy, h:MM tt"

		# Add all the necessary links to the message body.
		tweetMessageBody = tweet.text
		tweetMessageBody = convertLinks tweetMessageBody
		tweetMessageBody = convertUsernames tweetMessageBody
		tweetMessageBody = convertHashtags tweetMessageBody

		# This is the box that will hold the twitter message.
		tweetText =
			"<div class=\"#{tweetClass} tweet\">
				<div class=\"dark-box\">
					<p>#{tweetMessageBody}</p>
					<p><small><a href=\"http://twitter.com/shovon_rahman/status/#{tweet.id_str}\" target=\"_blank\">#{timeText}</a></small></p>
				</div>
			</div>"

		# After each box, there absolutely needs to be a clear box afterwards.
		clearBoxClass = if i is 1 then "clear_middle body_clear" else "body_clear"
		if (i + 1) % 4 is 0 then clearBoxClass += " clear"

		# Append the clear box.
		tweetText += "<div class=\"#{clearBoxClass}\"></div>"
		tweets += tweetText

	tweetBox = document.getElementById 'twitter'
	tweetBox.innerHTML = tweets
	