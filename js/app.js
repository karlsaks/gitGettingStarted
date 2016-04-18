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
}
return {userTweets:userTweets};
});

////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('cedrusController',function($window,$scope,$http,GetUsers,GetTweets) {
 
GetUsers.userInfo().then(function(info){
    $scope.fndr = info;
  });

GetTweets.userTweets().then(function(tweets){
    $scope.twts = tweets;
});

  this.founders = JSON.parse($window.localStorage.getItem("founders"));
  this.foundersMe={};
  this.addMemory = function() {
    
          
  };
  $scope.delete = function() { 
    console.log("hey");
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