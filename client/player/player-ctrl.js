angular.module('app.player', ['ui.router'])
.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl(Player, $rootScope, $state, $scope, $timeout) {

 var vm = this;
 $scope.loaded = true;
 $scope.currentSong = Player.getCurrent();

 $rootScope.$on('change', function() {
   console.log('inside player-ctrl.js, current song after change: ', Player.getCurrent());
   $scope.loaded = !$scope.loaded;
   $scope.currentSong = Player.getCurrent();
   //must have a delay to have div loaded after plangular fetch song src and song title
   $timeout(function() {
     $scope.loaded = !$scope.loaded;
   }.bind($scope), .1);
   //MAIN FEATURE THAT WE WANT TO IMPLEMENT
   //AUTO-PLAY SINGLE SONG ONCLICK, AND QUEUE SONGS IN PLAYLIST
  //  angular.element('#play').triggerHandler('click');

 });

}
