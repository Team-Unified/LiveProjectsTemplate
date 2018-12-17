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
        var reset = "Token Reset";

    $scope.$storage = $localStorage.$default({
        instagram: empty,

    });

    var instagramRequest = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';
    var resp;

    $scope.instagramLogin = function() {
        $cordovaOauth.instagram("CLIENT_ID",["basic"]).then(function(result) {
           
            $localStorage.instagram = result.access_token;
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    }  

    $scope.update = function() {

        req = instagramRequest + $localStorage.instagram;
        
        const http = new XMLHttpRequest()
        http.open("GET", req)
        http.send()
        http.onload = () => resp = JSON.parse(http.response);

        // this needs to be done in like a ForEach or something along them lines for how it works for Instagram, 
        // so then it will loop as many times there's objects in the response
        // right now i save the response to local storage, when i finish this to work the way it should then we won't need local storage?
        
        $localStorage.username = resp['data'][0]['user']['username']
        $localStorage.fullname = resp['data'][0]['user']['full_name']
        $localStorage.profile_picture = resp['data'][0]['user']['profile_picture']
        $localStorage.id = resp['data'][0]['user']['profile_picture']
        $localStorage.image_post = resp['data'][0]['images']['standard_resolution']['url']
        $localStorage.caption_text = resp['data'][0]['caption']['text']
        $localStorage.created_time = resp['data'][0]['caption']['created_time']
    }


    $scope.resetAll = function() {
    alert('Deleting saved tokens for all Accounts!');
    $localStorage.$reset({
        instagram: reset
    });
}

});
