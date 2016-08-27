angular.module('create-playlist', [])
.controller('CreatePlaylistCtrl', CreatePlaylistCtrl);

function CreatePlaylistCtrl(Create){
  var vm = this;

  vm.submitPlaylist = function(){
    console.log("submit playlist!");
    console.log(vm.playlistName);
    var playerInfo = {
      name: vm.playlistName,
      description: vm.description,
      limit: vm.limit,
      // tags: vm.tags,
      expiration: vm.exp
    }

    Create.postPlaylist(playerInfo);

  }

  return vm;
}
