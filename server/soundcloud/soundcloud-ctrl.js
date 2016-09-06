var soundcloudModel = require('./soundcloud-model.js');

module.exports = {

	search: function (req, res) {
		soundcloudModel.search(req.query)
		.then(function(data) {
			var results = data.map(function(song) {
				//only returning data front-end wants
				return {songURL: song.permalink_url, title: song.title, duration: song.duration}
			});
			res.status(200).json(results);
		});
	}

}
