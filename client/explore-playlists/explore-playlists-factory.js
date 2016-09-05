angular.module('app.explore')
.factory("Explore", function($http){

  //our http request to get all data from this endpoint
  function getPlaylists(){
    return $http({
      method: 'GET',
      url: '/db/playlists/getAll'
      //promise to show successful GET request
    })
    .then(function(success){
      return success.data;
      //give us error if error
    })
    .catch(function(error){
      console.log("error retrieving data: ", error);
    });
  }

  function deletePlaylist(playlistID){
    console.log("deleting playlist")
    return $http({
      method: 'POST',
      url: '/db/playlists/delete',
      data: {
        playlistID: playlistID
      }
    })
    .then(function(res){
      console.log("delete res", res);
      return res
    })
    .catch(function(err){
      console.log("Error in adding song of playlist");
    })
  }

  return {
    getPlaylists: getPlaylists,
    deletePlaylist: deletePlaylist
  }

});
