angular.module('app.playlist', [])
.controller('playlist-ctrl', function($scope, playlistFactory){
  console.log("Inside controller");
  $scope.lists = [
    {
      name: "HipHopPlaylist",
      description: "Trending August2016",
      image: "https://i1.sndcdn.com/artworks-000176386965-fnpeks-t200x200.jpg"
    },
    {
      name: "CountryPlaylist",
      description: "Yeehaw~~",
      image: "https://i1.sndcdn.com/artworks-000176386965-fnpeks-t200x200.jpg"
    },
    {
      name: "ClassicalPlaylist",
      description: "ZZZZzzzz",
      image: "https://i1.sndcdn.com/artworks-000176386965-fnpeks-t200x200.jpg"
    },
    {
      name: "EDMPlaylist",
      description: "Unce! Unce!",
      image: "https://i1.sndcdn.com/artworks-000176386965-fnpeks-t200x200.jpg"
    }
    ];

  playlistFactory.getPlaylists()
  //.then(function(response){
  //  $scope.lists = response.list;
  // });
});
