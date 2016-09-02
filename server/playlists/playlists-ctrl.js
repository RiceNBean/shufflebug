var playlist = require('./playlists-model');

module.exports = {

	//creates new playlist from playlist model
	createPlaylist: function(req, res) {
		var newPlaylist = new playlist(req.body);
		newPlaylist.save(function (error, post) {
			if (error) {
				res.send(error);
			} else {
				res.status(201).json(post);
			}
		});
	},

	//gets all playlists
	getAllPlaylists: function(req, res) {
		playlist.find(function(error, data) {
			if (error) {
				res.send(error);
			} else {
				data = data.map(function(playlist) {
					playlist.score = playlist.songs.reduce(function(acc, song) {
						return acc+song.upvotes-song.downvotes
					}, 0);
					return playlist;
				});
				res.status(200).json(data);
			}	
		});
	},

	//gets specific playlist based on id
	getPlaylist: function(req, res) {
		playlist.findById(req.params.id, function(error, data) {
			if (error) {
				res.send(error);
			} else {
				res.status(200).json(data);
			}
		});
	},

	//adds song to playlist
	addSong: function(req, res, next) {
		playlist.find({ _id: req.body.playlistID },
			function(error, data) {
				if (error) {
					res.send(error);
				}
				if (data[0].songs.length < data[0].limit) {
					playlist.update({ _id: req.body.playlistID },
						{ $addToSet: { songs: req.body.songObj }},
						function(error, numAffected) {
							if (error) {
								res.send(error);
							} else {
								res.status(201).json(numAffected);
							}
						});
					
				}
				if (data[0].songs.length == data[0].limit) {
					res.status(500).send();
				}
			});
	},

	//removes song from playlists, needs listID && songID
	removeSong: function(req, res) {
		playlist.update({ _id: req.body.playlistID },
			{ $pull:{ "songs": { _id: req.body.songID }}},
			function(error, numAffected) {
				if (error) {
					res.send(error);
				} else {
					res.status(201).json(numAffected);
				}
			});
	},

	upvoteSong: function(req, res) {
		playlist.update({ _id: req.body.playlistID, "songs._id": req.body.songID},
			{ $inc : { "songs.$.upvotes": 1 } },
			function(error, numAffected) {
				if (error) {
					res.send(error);
				} else {
					res.status(201).json(numAffected);
				}
			});
	},

	downvoteSong: function(req, res) {
		playlist.update({ _id: req.body.playlistID, "songs._id": req.body.songID},
			{ $inc : { "songs.$.downvotes": 1 } },
			function(error, numAffected) {
				if (error) {
					res.send(error);
				} else {
					res.status(201).json(numAffected);
				}
			});
	},

}
