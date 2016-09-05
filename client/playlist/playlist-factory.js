angular.module('app.playlist')
.factory('Playlist', Playlist);

function Playlist($http) {

  function fetchSongs(playlistID) {
    console.log('inside playlist-factory.js fetchSongs');
    return $http({
      method: 'GET',
      url: '/db/playlists/'+playlistID
    })
    .then(function(res) {
      //songURL, title, duration, _id, downvotes, upvotes
      return res.data;
    })
    .catch(function(err) {
      console.log('err retrieving playlist: ', err);
    });
  }

  function searchSong(searchInput) {
    console.log('inside playlist-factory.js searchSong');
    return $http({
      method: 'GET',
      url: '/api/soundcloud/search',
      params: {
        q: searchInput
      }
    })
    .then(function(res) {
      //songURL, title, duration
      return res.data;
    })
    .catch(function(err) {
      console.log('err searching songs: ', err);
    });
  }

  function addSong(songObj, playlistID) {
    console.log('inside playlist-factory.js addSong');
    return $http({
      method: 'POST',
      url: 'db/playlists/song/add',
      data: {
        playlistID: playlistID,
        songObj: songObj
      }
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('err adding song: ', err);
      return err;
    });
  }
  
  function removeSong(songID, playlistID) {
    console.log('inside playlist-factory.js removeSong');
    return $http({
      method: 'POST',
      url: 'db/playlists/song/remove',
      data: {
        playlistID: playlistID,
        songID: songID
      }
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('err removing song: ', err);
    });
  }

  function upvote(songID, playlistID) {
    console.log('inside playlist-factory.js upvote');
    return $http({
      method: 'POST',
      url: 'db/playlists/song/upvote',
      data: {
        playlistID: playlistID,
        songID: songID
      }
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('err upvoting song: ', err);
    });
  }

  function downvote(songID, playlistID) {
    console.log('inside playlist-factory.js downvote');
    return $http({
      method: 'POST',
      url: 'db/playlists/song/downvote',
      data: {
        playlistID: playlistID,
        songID: songID
      }
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('err downvoting song: ', err);
    });
  }

  return {
    fetchSongs: fetchSongs,
    searchSong: searchSong,
    addSong: addSong,
    removeSong: removeSong,
    upvote: upvote,
    downvote: downvote
  }

}
