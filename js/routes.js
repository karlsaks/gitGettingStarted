angular.module('cedrus')
.config(function($routeProvider){
   $routeProvider.when('/founders',{ 
     templateUrl: '/partials/founders.html',
   })
  .when('/me', {
    templateUrl: '/partials/MyProfile.html',
})
  .when('/tweets', {
    templateUrl: '/partials/tweets.html',
})
  .otherwise({redirectTo: '/'});

});