angular.module('app.create', [])
.controller('CreatePlaylistCtrl', CreatePlaylistCtrl);

function CreatePlaylistCtrl(Create){
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
      //then use the id to redirect to the single playlist view
      return result;
    });

  }

  return vm;
}
