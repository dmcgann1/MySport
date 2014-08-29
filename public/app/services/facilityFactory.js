app.factory('facilityFactory', ['$http', function($http) {
  var factory = {};

  factory.getFacility = function(facilityId) {
    return $http.get('/facilities/' + facilityId);
  };

  factory.likeFacility = function(facilityId) {
    return $http.post('/facilities/' + facilityId + '/likes')
  }

  return factory;
}]);
