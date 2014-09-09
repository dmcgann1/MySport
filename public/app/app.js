var app = angular.module('SportFinder', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngTagsInput', 'ui.bootstrap.datetimepicker']);

// Routes

app.config(['$routeProvider', function($routeProvider, $http, $rootScope){
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/home.html',
    controller: 'HomeController',
  })
  .when('/users/:userId',{
    templateUrl: 'app/views/profile.html',
    controller: 'ProfileController'
  })
  .when('/sports', {
    templateUrl: 'app/views/sports.html',
    controller: 'SportsController'
  })
  .when('/activityfeed', {
    controller: 'ActivityFeedController',
    templateUrl: 'app/views/activity_feed.html'
    // resolve: {
    //   userLoggedIn: function($q, $http, $rootScope) {
    //     var currentUser, defer = $q.defer();
    //     $http.get('/users')
    //       .success(function(current_user) {
    //         $rootScope.current_user = current_user;
    //         currentUser = current_user;
    //         defer.resolve(currentUser);
    //       });
    //     return defer.promise;
    //   }
    // }
  })
  .when('/myfacilities', {
    templateUrl: 'app/views/my_facilities.html',
    controller: 'MyFacilitiesController'
  })
  .when('/facilities/:facilityId', {
    templateUrl: 'app/views/facility.html',
    controller: 'FacilityController'
  })
  .when('/search', {
    templateUrl: 'app/views/results.html',
    controller: 'ResultsController'
  })
  .otherwise( {redirectTo: '/'}
    );

}]);

app.run(function($location, $rootScope, $http) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    // var user, deferred = $q.defer();

    // $http.get('/users')
    //   .success(function(current_user) {
    //     $rootScope.current_user = current_user;
    //     deferred.resolve(user);
    //   });
    // return deferred.promise;
    // if(!$rootScope.hasUser) {
    //   $http.get('/users')
    //   .success(function(current_user) {
    //     $rootScope.current_user = current_user;
    //     $rootScope.loggedIn();
        if(!$rootScope.hasUser) {
          $location.path('/');
        }
      });
});


