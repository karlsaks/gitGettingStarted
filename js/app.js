(function () {
var app = angular.module ('cedrus',['ngRoute']);
// SERVICE to get http users ///////////////////////////////////////////////////////////////////
app.service('GetUsers', function($http){
  function userInfo() {
  return $http.get('/users').then(function(response) {
    return response.data;
  });
}
return {userInfo:userInfo};
});

app.service('GetTweets', function($http){
  function userTweets() {
  return $http.get('/@cedrusco').then(function(response) {
    return response.data;
  });

  // '/users/' + founder._id
}
return {userTweets:userTweets};

// return {
//   userTweets: function() {
//     return $http.get('/@cedrusco')
//       .then(function(response) {
//         return response.data;
//       });
//   }
// }
});

////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('cedrusController',function($scope,$http,GetUsers,GetTweets) {
 
GetUsers.userInfo().then(function(info){
    $scope.fndr = info;
  });

GetTweets.userTweets().then(function(tweets){
    $scope.twts = tweets;
});

  this.addMemory = function() {
    
          
  };

  $scope.delete = function(founder) {
    $http.delete('/users/' + founder._id)
      .then(function(deletedFounder) {
        console.log('Deleted:', deletedFounder);
      });
  }

});
app.controller('PController',function () {
	this.tab=1;
	this.selectTab = function (tab) {
		this.tab=tab;
		return tab;
	};
	this.isSelected = function (checkTab) { 
		return this.tab === checkTab;
	};
});
})();