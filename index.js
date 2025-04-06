$(document).ready(() => {
  // Create the centered app container
  const $appDiv = $('<div id="app"></div>');
  $('body').html('').append($appDiv); // Clear body and add app

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

  // Create and style a wolf image header
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

  // Create a textbox
  const $textBox = $('<input type="text">');
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
  $appDiv.prepend($textBox);

  // Create Post button
  const $twitterButton = $('<button></button>');
  $twitterButton.text('Howl');
  $textBox.before($twitterButton);

  // Post button event
  $twitterButton.on('click', () => {
    const tweetText = $textBox.val().trim();

    if (tweetText.length === 0) {
      alert("Tweet can't be empty bestie");
      return;
    }

    writeTweet(tweetText);
    $textBox.val('');
    tweetCreator();
  });

  // Show New Tweets button
  const $newButton = $('<button>Show New Tweets</button>');
  $appDiv.prepend($newButton);
  $newButton.on('click', () => {
    tweetCreator();
  });

  // Home button
  const $homeButton = $('<button>Home</button>');
  $appDiv.prepend($homeButton);
  $homeButton.on('click', () => {
    tweetCreator();
  });

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

  // Initial tweet load
  tweetCreator();
});
