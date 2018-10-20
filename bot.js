let twit = require('twit');
let config = require('./config');

let Twitter = new twit(config);

const params = {
  q: '#100DaysOfCode, #freeCodeCamp, #CodeNewBie, #codenewbie, #freecodecamp',
  result_type: 'recent',
  lang: 'en'
};

let retweet = () => {
  Twitter.get('search/tweets', params, function (err, data) {
    if (!err) {
      let retweetId = data.statuses[0].id_str;
      Twitter.post('statuses/retweet/:id', { id: retweetId }, function (err) {
        if (err) {
          console.log(`Couldn't retweet...`);
        }
      });
    }
    else {
      console.log(`Couldn't search...`);
    }
  });
}

let favoriteTweet = () => {
  Twitter.get('search/tweets', params, function(data) {
    let tweet = data.statuses;
    let randomTweet = ranDom(tweet);

    if(typeof randomTweet != 'undefined') {
      Twitter.post('favorites/create', { id: randomTweet.id_str}, function(err) {
        if(err) {
          console.log(`Can't be favorite...`);
        }
      });
    }
  });
}

const ranDom = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

retweet();
favoriteTweet();

setInterval(retweet, 30);
setInterval(favoriteTweet, 36);