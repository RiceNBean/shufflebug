angular.module('app', ['ui.router', 'create-playlist'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('create',{
    url: "/create",
    templateUrl: "../create-playlist/create-playlist.html",
    controller: "CreatePlaylistCtrl as vm"
  })

  $urlRouterProvider.otherwise('/')
});
