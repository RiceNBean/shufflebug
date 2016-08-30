angular.module('app.playlist', [])
.controller('PlaylistCtrl', PlaylistCtrl);

function PlaylistCtrl(Playlist, Player){
  var vm = this;

  vm.searchSong = function(){
    console.log("in vm.searchsong function");
    //go to factory
    Playlist.searchSong(vm.searchInput)
    .then(function(result){
      //result in dropdown
      return result;
    });
  }

  vm.playSong = function(){
    //go to player factory
    console.log("in playlist ctrl, playsong()");
    var songURL = "https://soundcloud.com/lottamor/spring-time-yiruma";
    Player.setCurrent(songURL);
  }

  vm.upvote = function(){}
  vm.downvote = function(){}
  vm.removeSong = function(){}

  return vm;
}
