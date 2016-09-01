angular.module('app.playlist', [])
.controller('PlaylistCtrl', PlaylistCtrl);

function PlaylistCtrl(Playlist, Player, $rootScope){
  var vm = this;
  var playlistID = "57c71e16eed3915f0f4a619b";

  vm.fetchSongs = function(id){
    Playlist.fetchSongs(playlistID)
    .then(function(result){
      vm.playlistName = result.name;
      vm.description = result.description;
      vm.songData = result.songs;
      return result;
    })
  }
  vm.searchSong = function(){
    Playlist.searchSong(vm.searchInput)
    .then(function(result){
      result.map(function(entry){
        return entry.duration = toMinute(entry.duration);
      })
      vm.searchResults = result;
      return result;
    });
  }
  vm.addSong = function(songURL, title){
    console.log("in add song songurl", songURL);
    var songObj = {
      songURL: songURL,
      title: title
    }
    Playlist.addSong(songObj, playlistID)
    .then(function(result){
      //fetch playlist again
      vm.fetchSongs(playlistID);
      return result;
    });
  }
  vm.removeSong = function(songID){
    Playlist.removeSong(songID, playlistID)
    .then(function(result){
      //fectch playlist again
      return result;
    })
  }
  vm.upvote = function(songID){
    Playlist.upvote(songID, playlistID)
    .then(function(result){
      //fetch playlist ,turn thumbs black
      return result;
    });
  }
  vm.downvote = function(songID){
    Playlist.downvote(songID, playlistID)
    .then(function(result){
      //fetch playlist ,turn thumbs black
      return result;
    });
  }

  vm.playSong = function(){
    //go to player factory
    console.log("in playlist ctrl, playsong()");
    var songURL = "https://soundcloud.com/awfulpianosound/yiruma-river-flows-in-you";
    Player.setCurrent(songURL);
    $rootScope.$emit('change');
  }
  var toMinute = function(ms){
    var min = Math.floor(ms / 60000);
    var sec = ((ms % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? '0' : '') + sec;
  }
  var init = function(){
    vm.fetchSongs(playlistID);
  }
  init();
  return vm;
}
