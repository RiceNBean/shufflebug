angular.module('app.player', ['ui.router'])
.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl(Player, $rootScope, $state, $scope){
  var vm = this;
  $scope.currentSong = Player.getCurrent();

  $rootScope.$on('change', function() {
    console.log("player.get current after change", Player.getCurrent());
    $scope.currentSong = Player.getCurrent();
  })

  return vm;
}
