angular.module('starter', ['ngStorage', 'ngCordovaOauth', 'ionic'])

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
