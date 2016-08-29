var router = require('express').Router();
var soundcloudController = require('../soundcloud/soundcloud-ctrl.js');
var playlistsController = require('../playlists/playlists-ctrl.js');

//create playlist view
// router.post('/db/playlists/create', playlistsController.createPlaylist);

// //all playlist view
// router.get('/db/playlists/getAll', playlistsController.getAllPlaylists);

// //single playlist view
// router.get('/db/playlists/:id', playlistsController.getPlaylist);
// //soundcloud search
router.get('/api/soundcloud/search', soundcloudController.search);
// //edit songs in playlist
// router.post('/db/playlists/:id/song/add', );
// router.post('/db/playlists/:id/song/remove', );
// router.post('/db/playlists/:id/song/upvote', );
// router.post('/db/playlists/:id/song/downvote', );

module.exports = router;
