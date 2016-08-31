angular.module('app.player', ['ui.router'])
.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl(Player, $rootScope, $state){
  var vm = this;
  vm.currentSong = Player.getCurrent();

  $rootScope.$on('change', function() {
    console.log("find changes, now is", Player.getCurrent());
    vm.currentSong = Player.getCurrent();
  })

  return vm;
}
