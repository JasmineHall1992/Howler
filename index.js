$(document).ready(() => {
 window.visitor = "JasmineHall125";

  // Create the centered app container
  const $appDiv = $('#app'); 

  // Style the body to center everything
  $('body').css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    margin: '0',
    backgroundColor: '#f3e6fa',
    fontFamily: 'Verdana, sans-serif'
  });

  // Style the app container
  $appDiv.css({
    maxWidth: '600px',
    width: '100%',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    textAlign: 'center'
  });

  // Create and style a wolf and moon header
  const $headerWolf = $('<img>');
  $headerWolf.attr('src', 'https://nypost.com/wp-content/uploads/sites/2/2024/01/leo-wolf-moon.gif?resize=1536,1025');
  $headerWolf.attr('alt', 'Majestic wolf looking fierce');
  $headerWolf.css({
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '20px'
  });
  $appDiv.prepend($headerWolf);

  // Create a tweet container
  const $tweetContainer = $('<div></div>');
  $tweetContainer.appendTo($appDiv);

  // Create and style the textbox
  const $textBox = $('<input type="text" id="tweet-box">');
  $textBox.attr('placeholder', "What's on your mind?");
  $textBox.css({
    textAlign: 'center',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    marginBottom: '10px'
  });

  // Create the button WITH an ID
  const $howlButton = $('<button id="howl-button">Howl</button>');
  $howlButton.css({
    backgroundColor: '#d8b7dd',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px'
  });

  // Add the button and textbox 
  $appDiv.prepend($textBox);
  $appDiv.prepend($howlButton);

  // Show New Tweets button
  const $newButton = $('<button>Show New Tweets</button>');
  $appDiv.prepend($newButton);
  
  // Home button
  const $homeButton = $('<button>Home</button>');
  $appDiv.prepend($homeButton);

  // Tweet generator function
  function tweetCreator(username) {
    $tweetContainer.empty();

    const timeline = username ? streams.users[username] : streams.home;

    const $tweets = timeline.map((tweet) => {
      const $tweet = $('<div></div>');

      const $username = $('<span></span>');
      $username.text(`@${tweet.user}`);
      $username.css({ color: 'orange', cursor: 'pointer' });
      $username.on('click', () => {
        tweetCreator(tweet.user);
      });

      const $message = $('<span></span>');
      $message.text(`: ${tweet.message}`);

      const timeAgo = moment(tweet.created_at).fromNow();
      const exactTime = moment(tweet.created_at).format('MMM D [at] h:mm A');
      const $timeStamp = $('<span></span>');
      $timeStamp.text(` — ${timeAgo} · ${exactTime}`);
      $timeStamp.css({ display: 'block', fontSize: '0.8em', color: 'gray' });

      $tweet.append($username, $message, $timeStamp);
      return $tweet;
    });

    $tweets.forEach(($tweet) => {
      $tweetContainer.prepend($tweet);
    });
  }

  // Howl button click handler - SIMPLIFIED VERSION
  $howlButton.on('click', function() {
    const tweetText = $('#tweet-box').val().trim();
    //tweet must have a username
    //default username
    //we had to set the window.visitor before calling the users on the streams.users array
    const defaultUser = window.visitor;
    streams.users[defaultUser] = [];
 

    if (!tweetText) {
      alert("Tweet Can't be Empty Bestie");
      return;
    }
    
    writeTweet(tweetText);
    $('#tweet-box').val('');

    tweetCreator();
  });


  // Initial tweet load
  tweetCreator();
});