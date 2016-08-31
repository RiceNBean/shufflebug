var SC = require('node-soundcloud');

//set SoundCloud client credentials and query parameters
var clientId = '81348298631dbd924acba1a117c7ab7d';
var clientSecret = '594340f670ba0580802e15a95787d7b9';

SC.init({
  id: clientId
});

function search(params) {
	console.log('inside soundcloud-model.js search model');
	return new Promise(function(resolve, reject) {
		SC.get('/tracks', {
			q: params.q
		}, function(err, tracks) {
			if(err) {
				reject(err);
			} resolve(tracks);
		});
	})
};

module.exports = {
	search: search
}
