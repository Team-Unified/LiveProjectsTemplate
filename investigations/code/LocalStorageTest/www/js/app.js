
angular.module('starter', ['ionic', 'ngCordovaOauth','ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {

      StatusBar.styleDefault();
    }
  });
})
.controller("MainController", function(
    $scope,
    $cordovaOauth, 
    $localStorage
    ){

    var empty = "No Token";

    $scope.$storage = $localStorage.$default({
        instagram: empty,
        linkedin: empty,
        facebook: empty,
        reddit: empty
    });

    status: string = "";
    $scope.instagramLogin = function() {
        $cordovaOauth.instagram("CLIENT_ID_HERE", ["basic"],["object options"]).then(function(result) {
            console.log(JSON.stringify(result));
            $localStorage.instagram = JSON.stringify(result);
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    }  

    $scope.linkedinLogin = function() {
        $cordovaOauth.linkedin("CLIENT_ID", "CLIENT_SECRET", ["r_basicprofile", "r_emailaddress"], "STATE_STRING").then(function(result) {
            console.log(JSON.stringify(result));
            $localStorage.linkedin = JSON.stringify(result);
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    }

    $scope.twitterLogin = function() {
      $cordovaOauth.twitter("CLIENT_ID","CLIENT_SECRET").then(function(result) {
          console.log(JSON.stringify(result));
          $localStorage.twitter = JSON.stringify(result);
      }, function(error) {
          console.log(JSON.stringify(error));
      });
  }

  $scope.facebookLogin = function() {
      $cordovaOauth.facebook("CLIENT_ID_HERE", ["email"], {"auth_type": "rerequest"}).then(function(result) {
        console.log(JSON.stringify(result));
        $localStorage.twitter = JSON.stringify(result);
    }, function(error) {
        console.log(JSON.stringify(error));
    });
}
    $scope.redditLogin = function() {
    $cordovaOauth.reddit("clientId", "clientSecret", ["appScope"], ["object options"]).then(function(result) {
        console.log(JSON.stringify(result));
        $localStorage.reddit = JSON.stringify(result);
    }, function(error) {
        console.log(JSON.stringify(error));
    });
}

    $scope.resetAll = function() {
    alert('Deleting saved tokens for all Accounts!');
    $localStorage.$reset();
}

});
