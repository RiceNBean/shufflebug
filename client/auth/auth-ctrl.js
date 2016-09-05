angular.module('app.auth', ['ngCookies', 'ui.router'])
.controller('AuthCtrl', AuthCtrl);

function AuthCtrl($state, Auth, $cookies, $scope) {

  var vm = this;
  var checkLogin = $cookies.get('currentUser');
  $scope.flag = false;

  vm.signin = function() {
    console.log('inside auth-ctrl.js signin')
    $scope.flag = false;
    var user = {
      username: vm.username,
      password: vm.password
    }
    Auth.signin(user)
    .then(function(result) {
      if(result.status === 500) {
        vm.password = '';
        $scope.flag = true;
      } else {
        $scope.flag = false;
        $cookies.put('currentUser', result);
        $state.go('explore');
        return result;
      }
    });
  }

  vm.signup = function() {
    console.log('inside auth-ctrl.js signup')
    $scope.flag = false;
    var user = {
      username: vm.username,
      password: vm.password
    }
    Auth.signup(user)
    .then(function(result) {
      if(result.status === 500) {
        vm.password = '';
        $scope.flag = true;
      } else {
        $scope.flag = false;
        $cookies.put('currentUser', result);
        $state.go('explore');
        return result;
      }
    });
  }

  vm.signout = function() {
    $cookies.remove('playlistID')
    $cookies.remove('currentUser');
    $state.go('signin');
  }

  function init() {
    $scope.flag = false;
    if($state.current.name === 'signout' && checkLogin === undefined) {
      $state.go('signin');
    }
    if(($state.current.name === 'signup' || $state.current.name === 'signin') && checkLogin !== undefined) {
      $state.go('signout');
    }
  }

  init();

  return vm;

}
