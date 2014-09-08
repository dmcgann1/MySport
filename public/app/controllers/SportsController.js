app.controller('SportsController', ['$scope', 'sportsFactory', function($scope, sportsFactory) {

  $scope.mySports = function() {
    $scope.likedSports = $scope.current_user.sports.map(function(sport) {return sport.id;});
    console.log($scope.likedSports);
  };

  $scope.likeSport = function(sportId) {
    sportsFactory.likeSport(sportId)
      .success($scope.getUser);
  };

  $scope.sportIsLiked = function(sport) {
    for (i = 0; i < $scope.likedSports.length; i++)
      if(sport.id === $scope.likedSports[i]) {
        return true;
      }
  };

  $scope.$watch('current_user', function() {
    $scope.mySports();
  });

  function init() {

    sportsFactory.getSports()
      .success(function(sports) {
        $scope.sports = sports;
      })
      .error(function(data) {
        console.log(data);
      });

    $scope.mySports();

  }
  init();

}]);
