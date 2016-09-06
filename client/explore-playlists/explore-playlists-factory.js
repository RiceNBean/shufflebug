angular.module('app.explore')
.factory('Explore', Explore);

function Explore($http) {

  function getPlaylists() {
    return $http({
      method: 'GET',
      url: '/db/playlists/getAll'
    })
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log('err retrieving playlists: ', err);
    });
  }

  function deletePlaylist(playlistID) {
    return $http({
      method: 'POST',
      url: '/db/playlists/delete',
      data: {
        playlistID: playlistID
      }
    })
    .catch(function(err){
      console.log('err deleting playlist: ', err);
    });
  }

  return {
    getPlaylists: getPlaylists,
    deletePlaylist: deletePlaylist
  }

}
