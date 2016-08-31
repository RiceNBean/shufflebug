var SC = require('node-soundcloud');

//set SoundCloud client credentials and query parameters
var clientId = process.env.SoundCloud_clientId;
var clientSecret = process.env.SoundCloud_clientSecret;

SC.init({
  id: clientId
});

module.exports = {

	search: function(params) {
		console.log('inside soundcloud-model.js search model');
		return new Promise(function(resolve, reject) {
			SC.get('/tracks', {
				q: params.q,
				'duration[to]': 600000
			}, function(err, tracks) {
				if(err) {
					reject(err);
				} resolve(tracks);
			});
		})
	}

}
