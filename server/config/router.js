var router = require('express').Router();
var soundcloudController = require('../soundcloud/soundcloud-ctrl.js');
var playlistsController = require('../playlists/playlists-ctrl.js');

//create playlist view
router.post('/db/playlists/create', playlistsController.createPlaylist);

//all playlist view
router.get('/db/playlists/getAll', playlistsController.getAllPlaylists);

//single playlist view
router.get('/db/playlists/:id', playlistsController.getPlaylist);

//soundcloud search
router.get('/api/soundcloud/search', soundcloudController.search);
//edit songs in playlist
router.post('/db/playlists/song/add', playlistsController.addSong);
router.post('/db/playlists/song/remove', playlistsController.removeSong);
router.post('/db/playlists/song/upvote', playlistsController.upvoteSong);
router.post('/db/playlists/song/downvote', playlistsController.downvoteSong);

module.exports = router;
