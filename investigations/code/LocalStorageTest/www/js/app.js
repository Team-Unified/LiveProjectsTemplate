// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordovaOauth','ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
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
        var reset = "Token Reset";

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
        $cordovaOauth.linkedin("CLIENT_ID_HERE", "CLIENT_SECRET_HERE", ["r_basicprofile", "r_emailaddress"], "my-state-data").then(function(result) {
            console.log(JSON.stringify(result));
            $localStorage.linkedin = JSON.stringify(result);
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    }

    $scope.facebookLogin = function() {
      $cordovaOauth.facebook("CLIENT_ID_HERE", ["email"], {"auth_type": "rerequest"}).then(function(result) {
          console.log(JSON.stringify(result));
          $localStorage.facebook = JSON.stringify(result);
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
    $localStorage.$reset({
        instagram: reset,
        linkedin: reset,
        facebook: reset,
        reddit: reset
    });
}

});
