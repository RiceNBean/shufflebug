angular.module('app.create')
.factory('Create', Create);

function Create($http) {

  function postPlaylist(playlistInfo){
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
      return err;
    });
  }

  return {
    postPlaylist: postPlaylist
  }

}
