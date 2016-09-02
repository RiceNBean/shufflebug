angular.module('app.explore')
.factory("Explore", function($http){
//getPlaylists to private
  return {
    getPlaylists: getPlaylists
  };
//our http request to get all data from this endpoint
  function getPlaylists(data){
    return $http({
      method: 'GET',
      url: '/db/playlists/getAll',
      params: {
        data: data
      }
      //promise to show successful GET request
    }).then(function(success){
      return success.data;
      //give us error if error
    }).catch(function(error){
      console.log("error retrieving data: ", error);
    });
  }
});
