angular.module('app.create', ['ngCookies', 'ui.router'])
.controller('CreatePlaylistCtrl', CreatePlaylistCtrl);

function CreatePlaylistCtrl($state, Create, $cookies, $scope) {

  var vm = this;
  var currentUser = $cookies.get('currentUser');
  //$scope.flag is true if playlistname is taken
  $scope.flag = false;

  vm.submitPlaylist = function() {
    console.log('inside create-playlist-ctrl.js submitPlaylist');
    var playerInfo = {
      name: vm.playlistName,
      description: vm.description,
      limit: vm.limit,
      creator: currentUser
    }
    Create.postPlaylist(playerInfo)
    .then(function(result) {
      if(result.status === 500) {
        //500 error from server if playlist name is taken
        vm.playlistName = '';
        $scope.flag = true;
      } else {
        //store playlistID in cookies
        $cookies.put('playlistID', result);
        //redirect user to single playlist
        $state.go('playlist');
        return result;
      }
    });
  }

  function init() {
    if(currentUser === undefined) {
      //redirect to signin if not authenticated
      $state.go('signin');
    }

  }

  init();

  return vm;

}
