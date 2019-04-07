// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.user = {
      email: 'foo@bar.com',
      password: 'foobar'
    };

    $scope.login = function() {
      AuthService.login($scope.user.email, $scope.user.password)
        .then(function() {

          // return to saved returnTo state before redirection to login
          if ($scope.returnTo && $scope.returnTo.state) {
            $state.go(
              $scope.returnTo.state.name,
              $scope.returnTo.params
            );
            // maintain the inherited rootscope variable returnTo
            // but make the returnTo state of it null,
            // so it can be used again after a new login.
            $scope.returnTo.state  = null;
            $scope.returnTo.params = null;
            return;
          }
          // or go to the default state after login
          $state.go('add-review');
        });
    };
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    AuthService.logout()
      .then(function() {
        $state.go('login');
      });
  }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.roleData = {
      roles: [
        {value: 'admin', name: 'Admin'},
        {value: 'partner', name: 'Partner'},
        {value: 'user', name: 'User'}
      ]
    };

    $scope.user = {
      email: 'baz@qux.com',
      password: 'bazqux',
      role: "user"
    };

    $scope.register = function() {
      AuthService.register($scope.user.email, $scope.user.password, $scope.user.role)
        .then(function(data) {
          if ($scope.user.role === 'admin') {
            alert('Success registering new user : ' + data.email + '\n log in to perform more actions.');
          } else {
            $state.transitionTo('sign-up-success');
          }
        }, function (reason) {
          alert('Unable to register' + $scope.user.email + '\n please try again.');
        });
    };
  }]);
