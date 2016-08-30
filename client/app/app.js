angular.module("app", ["ui.router", "app.playlist"])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state("playlist", {
    url: '/',
    templateUrl: './playlist/playlist.html',
    controller: 'playlist-ctrl'
  });
})
.factory("playlistFactory", function(){
  var getPlaylists = function(data){
    // return $http({
    //   method: 'GET',
    //   url: '/db/playlists/getAll',
    //   params: {data:data}
    // }).then(function(response){
    //   return data;
    // }).catch(function(error){
    //   console.log("error");
    // })
    console.log('Inside factory of playlist');
  };
  return {
    getPlaylists: getPlaylists
  };
});
