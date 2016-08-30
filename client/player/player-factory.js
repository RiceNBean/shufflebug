angular.module('app.player')
.factory("Player", Player);

function Player($http){
  var currentSong = "https://soundcloud.com/awfulpianosound/yiruma-river-flows-in-you";

  function setCurrent(songURL){
    console.log("in player factory, set song", songURL);
    currentSong = songURL;
    return;
  }
  
  function getCurrent(){
    return currentSong;
  }

  return {
    setCurrent: setCurrent,
    getCurrent: getCurrent
  }

}
