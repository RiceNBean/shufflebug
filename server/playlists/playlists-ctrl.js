var Playlist = require('./playlists-model');

function checkDuplicate(songArray, URL){
	var flag = false;
	songArray.forEach(function(song) {
		if(song.songURL === URL) {
			return flag = true;
		}
	})
	return flag;
}

function timeConvert(ms){
	var timeLeft = 604800000 - ms;
	var hr = Math.floor(timeLeft / 3600000);
	var min =  Math.floor((timeLeft % 3600000) / 60000);
	return hr + "hr " + (min < 10 ? '0' : '') + min + 'min';
}

module.exports = {

	//creates new playlist from playlist model
	createPlaylist: function(req, res) {
		Playlist.findOne({name: req.body.name},
		function(error, data) {
			if(!data) { 
				var newPlaylist = new Playlist(req.body);
				newPlaylist.save(function (error, post) {
					if (error) {
						res.send(error);
					} else {
						res.status(201).json(post);
					}
				});
			} else {
				res.status(500).send();
			}
		})
	},

	//deletes playlist from collection
	deletePlaylist: function(req, res) {
		Playlist.remove({ _id: req.body.playlistID },
		function(error) {
			if (error) {
				res.send(error);
			} else {
				res.status(201).send();
			}
		});
	},

	//gets all playlists
	getAllPlaylists: function(req, res) {
		Playlist.find(function(error, data) {
			if (error) {
				res.send(error);
			} else {
				data.map(function(playlist) {
					var createdTime = new Date(playlist.createdAt).getTime();
					var currentTime = new Date().getTime();
					playlist.expiringIn = timeConvert(currentTime-createdTime);
					playlist.score = playlist.songs.reduce(function(acc, song) {
						return acc+song.upvotes-song.downvotes
					}, 0);
					playlist.fire = playlist.score>=10?true:false
					return playlist;
				});
				res.status(200).json(data);
			}	
		});
	},

	//gets specific playlist based on id
	getPlaylist: function(req, res) {
		Playlist.findById(req.params.id, function(error, data) {
			if (error) {
				res.send(error);
			} else {
				res.status(200).json(data);
			}
		});
	},

	//adds song to playlist
	addSong: function(req, res) {
		Playlist.findOne({ _id: req.body.playlistID },
		function(error, data) {
			if (error) {
				res.send(error);
			}
			else if (data.songs.length === data.limit || checkDuplicate(data.songs, req.body.songObj.songURL)) {
				res.status(500).send();
			}
			else if (data.songs.length < data.limit) {
				Playlist.update({ _id: req.body.playlistID },
				{ $addToSet: { songs: req.body.songObj }},
				function(error, numAffected) {
					if (error) {
						res.send(error);
					} else {
						res.status(201).json(numAffected);
					}
				});
			}
		});
	},

	//removes song from playlists, needs listID && songID
	removeSong: function(req, res) {
		Playlist.update({ _id: req.body.playlistID },
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
		Playlist.update({ _id: req.body.playlistID, "songs._id": req.body.songID},
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
		Playlist.update({ _id: req.body.playlistID, "songs._id": req.body.songID},
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
