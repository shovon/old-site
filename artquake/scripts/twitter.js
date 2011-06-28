/* Loads tweets from the twitter service. */
getTwitters('tweets', {
    id: 'ArtQuake411',
    count: 4,
    enableLinks: true,
    ignoreReplies: false,
    clearContents: true,
    newwindow: true,
    template: '<div class="tweet">%text%<br /><a class="tweet-time" target="_blank" href="http://twitter.com/%user_screen_name%/statuses/%id%/">%time%</a></div>'
});