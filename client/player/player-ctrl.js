angular.module('app.player', ['ui.router'])
.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl(Player, $rootScope, $state, $scope, $timeout){
 var vm = this;
 $scope.loaded = true;
 $scope.currentSong = Player.getCurrent();

 $rootScope.$on('change', function() {
   console.log("player ctrl current after change", Player.getCurrent());

   $scope.loaded = !$scope.loaded;
   $scope.currentSong = Player.getCurrent();

   $timeout(function(){
     $scope.loaded = !$scope.loaded;
   }.bind($scope),1);
  //  angular.element('#play').triggerHandler('click');

 })

}
