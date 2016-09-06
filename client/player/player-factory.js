angular.module('app.player')
.factory('Player', Player);

function Player($http) {

  var currentSong = 'https://soundcloud.com/arigasu/spring-time-yiruma';

  function setCurrent(songURL) {
    currentSong = songURL;
    return;
  }

  function getCurrent() {
    return currentSong;
  }

  return {
    setCurrent: setCurrent,
    getCurrent: getCurrent
  }

}
