app.controller('NavbarController', ['$rootScope', '$scope', 'userFactory', '$location', 'modalService', function($rootScope, $scope, userFactory, $location, modalService) {

  $scope.search = function(term1, term2) {
    $location.path('/search').search('q', [term1, term2]);
  };

  $scope.logout = function() {
    userFactory.logout()
      .success(
        $rootScope.hasUser = false,
        $location.path('/'))
      .error($rootScope.hasUser = false);
  };

  $scope.newBooking = function() {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/app/partials/booking-modal.html'
    };

    var modalOptions = {
        closeButtonText: 'Cancel',
    };
    modalService.showModal(modalDefaults, modalOptions);
  };

}]);
