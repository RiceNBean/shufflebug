angular.module('app.create', ['ngCookies', 'ui.router'])
.controller('CreatePlaylistCtrl', CreatePlaylistCtrl);

function CreatePlaylistCtrl($state, Create, $cookies, $scope){
  var vm = this;
  var checkLogin = $cookies.get('currentUser');
  $scope.flag = false;

  vm.submitPlaylist = function(){
    console.log("submit playlist!");
    var playerInfo = {
      name: vm.playlistName,
      description: vm.description,
      limit: vm.limit
    }

    Create.postPlaylist(playerInfo)
    .then(function(result){
      if(result.status === 500) {
        vm.playlistName = '';
        $scope.flag = true;
      } else {
        $cookies.put('playlistID', result._id);
        $state.go('playlist');
        return result;
      }
    });

  }

  function init() {
    if(checkLogin === undefined) $state.go('signin');
  }

  init();

  return vm;
}
