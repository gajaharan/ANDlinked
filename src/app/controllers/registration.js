app.controller('RegistrationCtrl', ['$scope', 'Authentication', function($scope, Authentication) {
  var vm = this;
  login = function() {
    Authentication.login($scope.user);
  };

  logout = function() {
    Authentication.logout();
  };

  registerUser = function() {
    Authentication.register($scope.user);
  };

  vm.login = login;
  vm.logout = logout;
  vm.registerUser = registerUser;

}]);
