angular.module('app', ['ui.router', 'app.create', 'app.playlist', 'plangular', 'app.explore'])
.config(function($stateProvider, $urlRouterProvider, plangularConfigProvider){
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
  .state('explore',{
    url: '/explore',
    templateUrl: "../explore-playlists/explore-playlists.html",
    controller: "ExploreCtrl as vm"
  })

  $urlRouterProvider.otherwise('/')

  plangularConfigProvider.clientId='81348298631dbd924acba1a117c7ab7d'
})
