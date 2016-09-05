angular.module('app.auth')
.factory('Auth', Auth);

function Auth($http) {

  function signin(user) {
    console.log('inside auth-factory.js signin');
    return $http({
      method: 'POST',
      url: '/db/users/signin',
      data: user
    })
    .then(function(res) {
      return res.data;
    }).catch(function(err) {
      console.log("err signing in: ", err);
      return err;
    });
  }

  function signup(user) {
    console.log('inside auth-factory.js signup');
    return $http({
      method: 'POST',
      url: '/db/users/signup',
      data: user
    })
    .then(function(res) {
      return res.data;
    }).catch(function(err) {
      console.log("err signing up: ", err);
      return err;
    });
  }

  return {
    signin: signin,
    signup: signup
  }

}
