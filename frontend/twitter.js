const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$( () => {
  $('button.follow-toggle').each((index, el) => {
    new FollowToggle($(el));
  });
  $('nav.users-search').each( (index, el) => {
    new UsersSearch($(el));
  });
  $('form.tweet-compose').each( (index, el) => {
    new TweetCompose($(el));
  });
});
