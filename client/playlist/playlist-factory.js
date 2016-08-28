angular.module('app.playlist')
.factory("Playlist", Playlist);

function Playlist($http){
  return{
    searchSong: searchSong,
    addSong: addSong,
    removeSong: removeSong,
    upvote: upvote,
    downvote: downvote
    // playSong: playSong???
  }

  function searchSong(searchInput){
    console.log("in playlist factory, searchsong", searchInput);
    return $http({
      method: 'GET',
      url: '/api/search/',
      params: {
        searchInput: searchInput
      }
    })
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log("Error in search song");
    })
  }
  
  function addSong(songURL){
    //render it on page if successful
  }
  function removeSong(songID){
    //send request to
  }
  function upvote(songID){}
  function downvote(songID){}
}
