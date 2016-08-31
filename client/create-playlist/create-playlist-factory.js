angular.module('app.create')
.factory("Create", Create);

function Create($http, $q){
  return {
    postPlaylist: postPlaylist
  }

  function postPlaylist(playlistInfo){
    console.log("post playlist", playlistInfo);
    return $http({
      method: 'POST',
      url: '/db/playlists/create',
      data: playlistInfo
    })
    .then(function(res){
      //should get a response of the id of the playlist created
      return res.data;
    })
    .catch(function(err){
      console.log("Failed posting playlist to server", err);
      return err;
    });

  }
}
