angular.module('app.auth')
.factory('Auth', function ($http) {

  function signin(user) {
    return $http({
    method: 'POST',
    url: '/db/users/signin',
    data: user
    })
    .then(function (res) {
      return res.data.username;
    }).catch(function(err) {
      return err;
    });
  }

  function signup(user) {
    return $http({
    method: 'POST',
    url: '/db/users/signup',
    data: user
    })
    .then(function (res) {
      return res.data.username;
    }).catch(function(err){
      return err;
    });
  }

  return {
    signin: signin,
    signup: signup
  }

});
