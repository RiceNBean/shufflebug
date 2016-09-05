angular.module('app.playlist', ['ngCookies'])
.controller('PlaylistCtrl', PlaylistCtrl);

function PlaylistCtrl(Playlist, Player, $rootScope, $cookies, $state, $scope) {

  var vm = this;
  var playlistID = $cookies.get('playlistID');
  var currentUser = $cookies.get('currentUser');
  $scope.flag = false;
  $scope.creator;

  vm.fetchSongs = function() {
    console.log('inside playlist-ctrl.js fetchSongs');
    Playlist.fetchSongs(playlistID)
    .then(function(result){
      vm.playlistName = result.name;
      vm.description = result.description;
      vm.songData = result.songs;
      vm.limit = result.limit;
      $scope.creator = result.creator===currentUser?true:false;
      return result;
    });
  }

  vm.searchSong = function() {
    console.log('inside playlist-ctrl.js searchSong');
    Playlist.searchSong(vm.searchInput)
    .then(function(result){
      result.map(function(entry){
        return entry.duration = toMinute(entry.duration);
      })
      vm.searchResults = result;
      return result;
    });
  }

  vm.addSong = function(songURL, title, duration) {
    console.log('inside playlist-ctrl.js addSong');
    $scope.flag = false;
    var songObj = {
      songURL: songURL,
      title: title,
      duration: duration
    }
    Playlist.addSong(songObj, playlistID)
    .then(function(result){
      if(result.status === 500) {
        $scope.flag = true;
      } else {
        //fetch playlist again
        vm.fetchSongs();
        return result;
      }
    });
  }

  vm.removeSong = function(songID) {
    console.log('inside playlist-ctrl.js removeSong');
    Playlist.removeSong(songID, playlistID)
    .then(function(result){
      vm.fetchSongs();
      return result;
    });
  }

  vm.upvote = function(songID) {
    console.log('inside playlist-ctrl.js upvote');
    Playlist.upvote(songID, playlistID)
    .then(function(result){
      //fetch playlist
      vm.fetchSongs();
      return result;
    });
  }

  vm.downvote = function(songID) {
    console.log('inside playlist-ctrl.js downvote');
    Playlist.downvote(songID, playlistID)
    .then(function(result){
      vm.fetchSongs();
      return result;
    });
  }

  vm.playSong = function(songURL) {
    console.log('inside playlist-ctrl.js playSong');
    Player.setCurrent(songURL);
    $rootScope.$emit('change');
  }
  
  function toMinute(ms) {
    var min = Math.floor(ms / 60000);
    var sec = ((ms % 60000) / 1000).toFixed(0);
    return min + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function init() {
    $scope.flag = false;
    if(currentUser === undefined) {
      $state.go('signin');
    //check if playlist
    } else if(playlistID === undefined) {
      $state.go('explore');
    }
    else {
      vm.fetchSongs();
    }
  }

  init();
  
  return vm;

}
