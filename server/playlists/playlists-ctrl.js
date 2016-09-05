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

function timeConvert(ms) {
	var timeLeft = 604800000 - ms;
	var hr = Math.floor(timeLeft / 3600000);
	var min =  Math.floor((timeLeft % 3600000) / 60000);
	return hr + "hr " + min + 'min';
}

module.exports = {

	//creates new playlist from playlist model
	createPlaylist: function(req, res) {
		console.log('inside playlists-ctrl.js createPlaylist');
		Playlist.findOne({name: req.body.name},
		function(err, data) {
			if(!data) { 
				var newPlaylist = new Playlist(req.body);
				newPlaylist.save(function (err, post) {
					if (err) {
						console.log('err creating playlist: ', err);
						res.send(err);
					} else {
						res.status(201).json(post._id);
					}
				});
			} else {
				res.status(500).send();
			}
		})
	},

	//deletes playlist from collection
	deletePlaylist: function(req, res) {
		console.log('inside playlists-ctrl.js deletePlaylist');
		Playlist.remove({ _id: req.body.playlistID },
		function(err) {
			if (err) {
				console.log('err deleting playlist: ', err);
				res.send(err);
			} else {
				res.status(201).send();
			}
		});
	},

	//gets all playlists
	getAllPlaylists: function(req, res) {
		console.log('inside playlists-ctrl.js getAllPlaylists');
		Playlist.find(function(err, data) {
			if (err) {
				console.log('err retrieving playlists: ', err);
				res.send(err);
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
		console.log('inside playlists-ctrl.js getPlaylist');
		Playlist.findById(req.params.id, function(err, data) {
			if (err) {
				console.log('err retrieving playlist: ', err);
				res.send(err);
			} else {
				res.status(200).json(data);
			}
		});
	},

	//adds song to playlist
	addSong: function(req, res) {
		console.log('inside playlists-ctrl.js addSong');
		Playlist.findOne({ _id: req.body.playlistID },
		function(err, data) {
			if (err) {
				console.log('err adding song: ', err);
				res.send(err);
			}
			else if (data.songs.length === data.limit || checkDuplicate(data.songs, req.body.songObj.songURL)) {
				res.status(500).send();
			}
			else if (data.songs.length < data.limit) {
				Playlist.update({ _id: req.body.playlistID },
				{ $addToSet: { songs: req.body.songObj }},
				function(err, numAffected) {
					if (err) {
						console.log('err adding song: ', err);
						res.send(err);
					} else {
						res.status(201).json(numAffected);
					}
				});
			}
		});
	},

	//removes song from playlists, needs listID && songID
	removeSong: function(req, res) {
		console.log('inside playlists-ctrl.js removeSong');
		Playlist.update({ _id: req.body.playlistID },
		{ $pull:{ "songs": { _id: req.body.songID }}},
		function(err, numAffected) {
			if (err) {
				console.log('err removing song: ', err);
				res.send(err);
			} else {
				res.status(201).json(numAffected);
			}
		});
	},

	//upvotes song from playlists, needs listID && songID
	upvoteSong: function(req, res) {
		console.log('inside playlists-ctrl.js upvoteSong');
		Playlist.update({ _id: req.body.playlistID, "songs._id": req.body.songID},
		{ $inc : { "songs.$.upvotes": 1 } },
		function(err, numAffected) {
			if (err) {
				console.log('err upvoting song: ', err);
				res.send(err);
			} else {
				res.status(201).json(numAffected);
			}
		});
	},

	//downvotes song from playlists, needs listID && songID
	downvoteSong: function(req, res) {
		console.log('inside playlists-ctrl.js downvoteSong');
		Playlist.update({ _id: req.body.playlistID, "songs._id": req.body.songID},
		{ $inc : { "songs.$.downvotes": 1 } },
		function(err, numAffected) {
			if (err) {
				console.log('err downvoting song: ', err);
				res.send(err);
			} else {
				res.status(201).json(numAffected);
			}
		});
	},

}
