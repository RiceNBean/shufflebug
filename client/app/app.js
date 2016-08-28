angular.module('app', ['ui.router', 'app.create', 'app.playlist'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('create',{
    url: "/create",
    templateUrl: "../create-playlist/create-playlist.html",
    controller: "CreatePlaylistCtrl as vm"
  })
  .state('playlist',{
    url: "/playlist",
    templateUrl: "../playlist/playlist.html",
    controller: "PlaylistCtrl as vm"
  })

  $urlRouterProvider.otherwise('/')
});
