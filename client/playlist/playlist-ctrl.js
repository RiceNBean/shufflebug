angular.module('app.playlist', [])
.controller('PlaylistCtrl', PlaylistCtrl);

function PlaylistCtrl(Playlist){
  var vm = this;

  vm.searchSong = function(){
    console.log("in vm.searchsong function");
    //go to factory
    Playlist.searchSong(vm.searchInput)
    .then(function(result){
      return result;
    });
  }

  return vm;
}
