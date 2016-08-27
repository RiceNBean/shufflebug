angular.module('create-playlist')
.factory("Create", Create);

function Create($http, $q){
  return {
    postPlaylist: postPlaylist
  }

  function postPlaylist(playlistInfo){
    console.log("post playlist", playlistInfo);
    return $http({
      method: 'POST',
      url: '/api/create',
      data: playlistInfo
    })
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log("Failed posting playlist to server", err);
      return err;
    });

  }
}
