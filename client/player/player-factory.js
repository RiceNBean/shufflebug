angular.module('app.player')
.factory("Player", Player);

function Player($http) {

  var currentSong = "https://soundcloud.com/arigasu/spring-time-yiruma";

  function setCurrent(songURL) {
    console.log("inside player-factory.js setCurrent", songURL);
    currentSong = songURL;
    return;
  }

  function getCurrent() {
    console.log("inside player-factory.js getCurrent");
    return currentSong;
  }
  
  return {
    setCurrent: setCurrent,
    getCurrent: getCurrent
  }

}
