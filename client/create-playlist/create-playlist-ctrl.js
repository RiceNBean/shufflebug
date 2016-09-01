angular.module('app.create', ['ngCookies', 'ui.router'])
.controller('CreatePlaylistCtrl', CreatePlaylistCtrl);

function CreatePlaylistCtrl($state, Create, $cookies){
  var vm = this;

  vm.submitPlaylist = function(){
    console.log("submit playlist!");
    console.log(vm.playlistName);
    var playerInfo = {
      name: vm.playlistName,
      description: vm.description,
      limit: 30,
      expiration: 30
    }

    Create.postPlaylist(playerInfo)
    .then(function(result){
      console.log("result._id", result._id);
      $cookies.put('playlistID', result._id);
      $state.go('playlist');
      return result;
    });

  }

  return vm;
}
