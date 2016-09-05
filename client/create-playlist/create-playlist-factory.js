angular.module('app.create')
.factory('Create', Create);

function Create($http) {

  function postPlaylist(playlistInfo){
    console.log('inside create-playlist-factory.js');
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
      console.log('err creating playlist: ', err);
      return err;
    });
  }

  return {
    postPlaylist: postPlaylist
  }

}
