app.controller('FacilityController', ['$scope', 'facilityFactory', '$routeParams', 'modalService', 'reviewFactory', '$rootScope', function($scope, facilityFactory, $routeParams, modalService, reviewFactory, $rootScope) {

  var facilityId = $routeParams.facilityId;
  $scope.isLiked = false;


  $scope.userLikes = function(facility) {
    for(i=0; i < $rootScope.current_user.likes.length; i++) {
      if(facility.id === $rootScope.current_user.likes[i].facility_id) {
        $scope.isLiked = true;
        $scope.likeId = $rootScope.current_user.likes[i].id;
        break;
      }
    }
  };

  function init() {
    $rootScope.getUser();

    facilityFactory.getFacility(facilityId)
      .success(function(facility) {
        $scope.facility = facility, $scope.userLikes(facility);
      })
      .error(function(data){
        console.log(data);
      });
  }
  init();

  $scope.newReview = function() {
    var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Create',
        headerText: 'Add a new review',
    };
    modalService.showModal({}, modalOptions).then(function(result){
      reviewFactory.addReview(facilityId, result)
        .success(init)
        .error(function(data){
          console.log(data);
        });
    });
  };

  $scope.editReview = function(reviewId) {
    var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Update',
        headerText: 'Edit review',
    };
    modalService.showModal({}, modalOptions).then(function(result){
      reviewFactory.updateReview(facilityId, reviewId, result)
        .success(init)
        .error(function(data){
          console.log(data);
        });
    });
  };

  $scope.deleteReview = function(reviewId) {
    reviewFactory.delReview(facilityId, reviewId)
      .success(init)
      .error(function(data){
        console.log(data);
      });
  };

  $scope.upVote = function(reviewId) {
    reviewFactory.upvote(reviewId)
      .success(init)
      .error(function(data){
        console.log(data);
      });
  };

  $scope.downVote = function(reviewId) {
    reviewFactory.downvote(reviewId)
      .success(init)
      .error(function(data){
        console.log(data);
      });
  };

  $scope.like = function() {
    facilityFactory.likeFacility(facilityId)
      .success(init);
  };

  $scope.unlike = function(likeId) {
    facilityFactory.unlikeFacility(likeId)
      .success(function() {
        $scope.isLiked = false;
    });
  };

}]);
