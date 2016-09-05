angular.module('app', ['ui.router', 'app.auth', 'app.create', 'app.playlist', 'plangular', 'app.explore', 'app.player'])
.config(function($stateProvider, $urlRouterProvider, plangularConfigProvider) {

  $stateProvider
  .state('create', {
    url: '/create',
    templateUrl: '../create-playlist/create-playlist.html',
    controller: 'CreatePlaylistCtrl as vm'
  })
  .state('playlist', {
    url: '/playlist',
    templateUrl: '../playlist/playlist.html',
    controller: 'PlaylistCtrl as vm'
  })
  .state('explore', {
    url: '/explore',
    templateUrl: '../explore-playlists/explore-playlists.html',
    controller: 'ExploreCtrl as vm'
  })
  .state('player', {
    url: '/player',
    templateUrl: '../player/player.html',
    controller: 'PlayerCtrl as vm'
  }).state('signup', {
    url: '/signup',
    templateUrl: '../auth/signup.html',
    controller: 'AuthCtrl as vm'
  }).state('signin', {
    url: '/signin',
    templateUrl: '../auth/signin.html',
    controller: 'AuthCtrl as vm'
  }).state('signout', {
    url: '/signout',
    templateUrl: '../auth/signout.html',
    controller: 'AuthCtrl as vm'
  });

  $urlRouterProvider.otherwise('/');

  plangularConfigProvider.clientId = '81348298631dbd924acba1a117c7ab7d';

});
