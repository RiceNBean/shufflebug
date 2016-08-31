var soundcloudModel = require('./soundcloud-model.js');

module.exports = {

	search: function (req, res) {
		console.log('inside soundcloud-ctrl.js search controller');
		soundcloudModel.search(req.query)
		.then(function(data) {
			results = data.map(function(song) {
				return {songURL: song.permalink_url, title: song.title, duration: song.duration}
			});
			res.status(200).json(results);
		});
	}

}
