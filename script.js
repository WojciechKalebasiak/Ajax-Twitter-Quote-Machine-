$().ready(function() {
    var prefix = "https://cors-anywhere.herokuapp.com/";
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    var trigger = $('.trigger');
    $.ajaxSetup({ cache: false });
    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet);
    }

    function createTweet(res) {
        var date = res[0];
        var quoteText = $(date.content).text().trim();
        var quoteAuthor = date.title;
        if (!quoteAuthor.length) {
            quoteAuthor = 'Unknown author';
        }
        var tweetContent = 'Quote of the day: ' + quoteText + 'Author: ' + quoteAuthor;
        if (tweetContent.length > 140) {
            getQuote();
        } else {
            var tweet = tweetLink + encodeURIComponent(tweetContent);
            $('.quote').text(quoteText);
            $('.author').text('Author: ' + quoteAuthor);
            $('.tweet').attr('href', tweet);
        }
        $(trigger).text('Random quote');
    	$(trigger).prop('disabled', false);
    } // end of createTweet


    getQuote();
    $('.trigger').click(function() {
    	$(this).text('Generating quote...');
    	$(this).prop('disabled', true);
        getQuote();
    }); // end of handler
}); //end of doc ready