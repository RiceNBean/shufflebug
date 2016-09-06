angular.module('app.explore', ['ngCookies'])
.controller('ExploreCtrl', ExploreCtrl);

function ExploreCtrl($scope, Explore, $cookies, $state) {

  var vm = this;
  var currentPlaylist = $cookies.get('playlistID');
  var currentUser = $cookies.get('currentUser');
  $scope.playlists;

  //on click we should go to a new endpoint
  vm.redirectPlaylist = function(playlistID) {
    //grab that id
    //$cookies.get(_id);
    //we concat the playlistID to 'playlist' endpoint to access each playlist
    $cookies.put('playlistID', playlistID);
    $state.go('playlist')
  };

  vm.getPlaylists = function() {
    //get data from our database
    Explore.getPlaylists()
    .then(function(data) {
      //check if user is playlist creator
      data.map(function(playlist) {
        playlist.admin = playlist.creator===currentUser?true:false;
        return playlist;
      });
      //assign that data to $scope.data so we can use in html
      $scope.playlists = data;
    });
  }

  vm.deletePlaylist = function(playlistID) {
    Explore.deletePlaylist(playlistID)
    .then(function() {
      if(playlistID === currentPlaylist) $cookies.remove('playlistID');
      vm.getPlaylists();
    });
  }

  function init() {
    if(currentUser === undefined) {
      $state.go('signin');
    } else {
      vm.getPlaylists();
    }
  }

  init();

  return vm;

}
