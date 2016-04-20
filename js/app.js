var app = angular.module ('cedrus',['ngRoute']);

app.service('GetTweets', function($http){
  function userTweets() {
  return $http.get('/@cedrusco').then(function(response) {
    return response.data;
  });
}
return {userTweets:userTweets};

});

app.controller('cedrusController',['$scope', '$http', 'GetTweets', function($scope,$http,GetTweets) {
this.founders={};
this.account = " ";
this.condition = false;
var store = this;

// // If I want to get tweets using the service created
// GetTweets.userTweets().then(function(tweets){
//     $scope.twts = tweets;
// });

  this.getMeTweetsOf = function(inp){
    this.condition = true ;
    inp = this.twitterAccnt;
    console.log("hey" + inp + this.condition);
    $http.get('/@cedrusco/'+inp).success(function(data){
      console.log("Got tweets");
      store.twts = data;
    });
  };

  this.addMemory = function(userMem) {
     console.log(hey);
  };

  $scope.delete = function(id) {
    $http.delete('/users/'+id)
      .success(function(response){
        console.log("deleted founder");
        refresh();
      });  
  };

  $scope.deleteMem = function(id) { 
    console.log(id);
    $http.put('/users/mem/'+id)
      .success(function(response){
        console.log("deleted memory" + id);
        refresh();
      });
  }

  var refresh = function () {
    $http.get('/users')
      .success(function(response){
        console.log(response);
        $scope.users = response ; 
      });
  }
  refresh();
}]);

app.controller('PController',['$scope','$http', function($scope,$http) {
	this.tab=1;
	this.selectTab = function (tab) {
		this.tab=tab;
		return tab;
	};
	this.isSelected = function (checkTab) { 
		return this.tab === checkTab;
	};

}]);

