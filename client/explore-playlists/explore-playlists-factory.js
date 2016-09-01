angular.module('app.explore')
.factory("explore", getPlaylists);
function getPlaylists(data){
  return $http({
      method: 'GET',
      url: '/db/playlists/getAll',
      params: {
        playlistID: playlistID,
        playlistTitle: playlistTitle,
        playlistImg: PlaylistImg,
        description: description
      }
    }).then(function(res){
      return res.data;
    }).catch(function(error){
      console.log("error");
    })
    return {
      getPlaylists:getPlaylists
    }

}
