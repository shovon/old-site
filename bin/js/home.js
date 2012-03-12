(function() {

  window.jsonpRequest = function(url, callback) {
    var bodyTag, callbackName, functionNameGen, query, scriptTag;
    functionNameGen = function() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return 'shovon' + (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    };
    callbackName = functionNameGen();
    query = "" + url + "&callback=" + callbackName;
    bodyTag = document.getElementsByTagName('body')[0];
    scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', query);
    window[callbackName] = function(data) {
      callback.call(window, data);
      delete [callbackName];
      return bodyTag.removeChild(scriptTag);
    };
    return bodyTag.appendChild(scriptTag);
  };

}).call(this);
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};(function() {
  var convertHashtags, convertLinks, convertUsernames, tweets, twitterQuery;

  convertLinks = function(text) {
    return text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$1" target="_blank">$1</a>');
  };

  convertUsernames = function(text) {
    return text.replace(/(\B@(\w|[a-b]|\d|_){1,15})/gi, function(u) {
      var username;
      username = u.replace('@', '');
      return "<a href=\"http://twitter.com/" + username + "\" target=\"_blank\">" + u + "</a>";
    });
  };

  convertHashtags = function(text) {
    return text.replace(/(\B#(\w|[a-b]|\d|_)+)/gi, function(h) {
      var hashtag;
      hashtag = h.replace('#', '');
      return "<a href=\"http://twitter.com/search?q=%23" + hashtag + "\" target=\"_blank\">" + h + "</a>";
    });
  };

  twitterQuery = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=false&screen_name=shovon_rahman&count=4';

  tweets = "";

  jsonpRequest(twitterQuery, function(data) {
    var clearBoxClass, i, timeText, tweet, tweetBox, tweetClass, tweetMessageBody, tweetText, _len;
    for (i = 0, _len = data.length; i < _len; i++) {
      tweet = data[i];
      tweetClass = i === 0 ? "first_column body_column" : i === 3 ? "last_column body_column" : "body_column";
      timeText = dateFormat(new Date(tweet.created_at), "mmmm d, yyyy, h:MM tt");
      tweetMessageBody = tweet.text;
      tweetMessageBody = convertLinks(tweetMessageBody);
      tweetMessageBody = convertUsernames(tweetMessageBody);
      tweetMessageBody = convertHashtags(tweetMessageBody);
      tweetText = "<div class=\"" + tweetClass + " tweet\">				<div class=\"dark-box\">					<p>" + tweetMessageBody + "</p>					<p><small><a href=\"http://twitter.com/shovon_rahman/status/" + tweet.id_str + "\" target=\"_blank\">" + timeText + "</a></small></p>				</div>			</div>";
      clearBoxClass = i === 1 ? "clear_middle body_clear" : "body_clear";
      if ((i + 1) % 4 === 0) clearBoxClass += " clear";
      tweetText += "<div class=\"" + clearBoxClass + "\"></div>";
      tweets += tweetText;
    }
    tweetBox = document.getElementById('twitter');
    return tweetBox.innerHTML = tweets;
  });

}).call(this);
