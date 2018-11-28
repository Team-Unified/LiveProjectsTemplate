var authExample = angular.module('starter', ['ionic', 'ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    console.log("platform is ready")

authExample.controller("authExample", function($scope, $cordovaOauth) {   
    $scope.login = function() {
        $cordovaOauth.Instagram("1eee6d9118fc4221be7049d1c59c47c5",["basic"]).then(function(result) {
          this.status = "Success, you're now connected!" + "Token:" + JSON.stringify(result);
         // redirect_uri: 'https://tinyurl.com/krmpchb'
        }, function(error) {
          this.status = "ERROR " + error; 
        });
    }
  })

    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {     
      StatusBar.styleDefault();
    }
  });
})
