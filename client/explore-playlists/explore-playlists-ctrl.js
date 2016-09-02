angular.module('app.explore', ['ngCookies'])
.controller('ExploreCtrl', function($scope, Explore, $cookies, $state){
    $scope.data;
    //on click we should go to a new endpoint
    $scope.redirectPlaylist = function(_id){
      //grab that id
      //$cookies.get(_id);
      //we concat the playlistID to 'playlist' endpoint to access each playlist
      $cookies.put('playlistID', _id);
      $state.go('playlist')
    };
    //get data from our database
    Explore.getPlaylists()
    .then(function(data){
      //assign that data to $scope.data so we can use in html
      $scope.data = data;
    }).catch(function(error){
      console.log(error);
    });

});
