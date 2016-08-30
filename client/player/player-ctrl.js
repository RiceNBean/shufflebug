angular.module('app.player', [])
.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl($scope, Player){
  var vm = this;

  // vm.songURL = Player.getCurrent();

  return vm;
}
