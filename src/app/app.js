var app = angular.module('LinkedApp', ['ngRoute', 'firebase'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'RegistrationCtrl as register'});
  $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'RegistrationCtrl as register'});
  $routeProvider.when('/success', {
      templateUrl: 'partials/success.html',
      controller: 'SuccessCtrl',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    })
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
