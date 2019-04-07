// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .factory('AuthService', ['Reviewer', '$q', '$rootScope', '$state', function(
      User, $q, $rootScope, $state) {
    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email,
            role: response.user.role
          };
        });
    }

    function logout() {
      return User
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(email, password, role) {
      return User
        .create({
         email: email,
         password: password,
         role: role
       })
       .$promise;
    }

    function refresh(accessTokenId) {
      return User
        .getCurrent(function(userResource) {
          $rootScope.currentUser = {
            id: userResource.id,
            tokenId: accessTokenId,
            email: userResource.email,
            role: userResource.role
          };
        });
    }
    return {
      login: login,
      logout: logout,
      register: register,
      refresh: refresh
    };
  }]);
