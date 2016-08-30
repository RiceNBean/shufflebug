angular.module('app.playlist', [])
.controller('PlaylistCtrl', PlaylistCtrl);

function PlaylistCtrl(Playlist, Player, $rootScope){
  var vm = this;

  vm.searchSong = function(){
    console.log("in vm.searchsong function");
    //go to factory
    Playlist.searchSong(vm.searchInput)
    .then(function(result){
      //result in dropdown
      console.log("result", result);
      vm.searchResults = result;
      return result;
    });
  }
  vm.addSong = function(){

  }
  vm.playSong = function(){
    //go to player factory
    console.log("in playlist ctrl, playsong()");
    var songURL = "https://soundcloud.com/awfulpianosound/yiruma-river-flows-in-you";
    Player.setCurrent(songURL);
    $rootScope.$emit('change');
  }

  vm.upvote = function(){}
  vm.downvote = function(){}
  vm.removeSong = function(){}

  return vm;
}
