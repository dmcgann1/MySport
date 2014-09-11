app.factory('facilityFactory', ['$http', function($http) {
  var factory = {};

  factory.getFacility = function(facilityId) {
    return $http.get('/facilities/' + facilityId);
  };

  factory.likeFacility = function(facilityId) {
    var data = {facility_id: facilityId};
    return $http.post('/likes/', data);
  };

  factory.unlikeFacility = function(likeId) {
    console.log(likeId);
    return $http.delete('/likes/' + likeId);
  };

  return factory;
}]);
