angular.module('app.create', ['ngCookies', 'ui.router'])
.controller('CreatePlaylistCtrl', CreatePlaylistCtrl);

function CreatePlaylistCtrl($state, Create, $cookies, $scope) {
  
  var vm = this;
  var currentUser = $cookies.get('currentUser');
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
    .then(function(result){
      if(result.status === 500) {
        vm.playlistName = '';
        $scope.flag = true;
      } else {
        $cookies.put('playlistID', result);
        $state.go('playlist');
        return result;
      }
    });

  }

  function init() {
    if(currentUser === undefined) $state.go('signin');
  }

  init();

  return vm;

}
