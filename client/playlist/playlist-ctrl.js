angular.module('app.playlist', ['ngCookies'])
.controller('PlaylistCtrl', PlaylistCtrl);

function PlaylistCtrl(Playlist, Player, $rootScope, $cookies){
  var vm = this;
  var playlistID = $cookies.get('playlistID');

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
      vm.fetchSongs(playlistID);
      return result;
    })
  }
  vm.upvote = function(songID){
    Playlist.upvote(songID, playlistID)
    .then(function(result){
      //fetch playlist
      vm.fetchSongs(playlistID);
      //turn thumbs black
      return result;
    });
  }
  vm.downvote = function(songID){
    Playlist.downvote(songID, playlistID)
    .then(function(result){
      vm.fetchSongs(playlistID);
      return result;
    });
  }

  vm.playSong = function(songURL){
    console.log("in playlist ctrl, playsong()");
    Player.setCurrent(songURL);
    $rootScope.$emit('change');
  }
  var toMinute = function(ms){
    var min = Math.floor(ms / 60000);
    var sec = ((ms % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? '0' : '') + sec;
  }
  var init = function(){
    //check if playlist
    vm.fetchSongs(playlistID);
  }
  init();
  return vm;
}
