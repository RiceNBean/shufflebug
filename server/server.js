var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var SC = require('node-soundcloud');

var app = express();
app.set('PORT', process.env.PORT || 3000);

// Set Spotify client credentials and query parameters
var clientId = '81348298631dbd924acba1a117c7ab7d';
var clientSecret = '594340f670ba0580802e15a95787d7b9';

app.use(bodyParser());
app.use(cors());
app.use(express.static('./client'));

SC.init({
  id: clientId
});

app.get('/home/search', function(req, res) {

  SC.get('/tracks', {
    q: req.query.q, license: 'cc-by-sa'
  }, function(err, tracks) {
    res.status(200).json(tracks);
  })

});

app.listen(app.get('PORT'), function() {
  console.log('Express server listening on port ', app.get('PORT'));
});
