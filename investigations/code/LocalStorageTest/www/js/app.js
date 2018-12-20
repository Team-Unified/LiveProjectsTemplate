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

    $scope.instagramLogin = function() {
        $cordovaOauth.instagram("e02772e6e7b04b4580e5067e3df7c4e9", ["basic"]).then(function(result) {
            console.log(JSON.stringify(result));
            $localStorage.instagram = JSON.stringify(result);
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    }  

    $scope.linkedinLogin = function() {
        $cordovaOauth.linkedin("863230xmne3ljd", "yiY4wIy2275byE3p", ["r_basicprofile", "r_emailaddress"], "teamunified-mmu-12345").then(function(result) {
            console.log(JSON.stringify(result));
            $localStorage.linkedin = JSON.stringify(result);
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    }

    $scope.twitterLogin = function() {
      $cordovaOauth.twitter("lbLHNqHsAc4fs9Z84YSGZ3dPM","vWuBYax5fxqt1Gdo6HmU87fhBVdprdYL6pMSHoGE1Avg2LQL1t").then(function(result) {
          console.log(JSON.stringify(result));
          $localStorage.twitter = JSON.stringify(result);
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
    $cordovaOauth.reddit("6IGRiZgCbkF48w", "Xk_Jk4s_9B15WenCTGSXcDp7-ng", ["History"]).then(function(result) {
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
