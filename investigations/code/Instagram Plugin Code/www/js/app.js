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
        
        var length = [resp['data'].length];
        var images = [length];
        var caption_text = [length];
        var created_time = [length];

        for(let i = 0; i < resp['data'].length; i++)
        { 
            //if a video is added it doesnt currently work, need to fix this or add it as an enhancement
            images[i] = resp['data'][i]['images']['standard_resolution']['url']
            //if no caption it currently errors
            caption_text[i] = resp['data'][i]['caption']['text']
            //again only works if a caption is present
            created_time[i] = new Date(parseInt (resp['data'][i]['caption']['created_time']) * 1000).toLocaleString()
        }

        $localStorage.image_post = images;
        $localStorage.caption_text = caption_text;
        $localStorage.created_time = created_time;

        //hardcoded to pull this from the first entry in the array since it only needs to be fetched once
        //only fetch if the localstorage is null, since these values can be reused
        while ($localStorage.username == null && $localStorage.fullname == null && $localStorage.profile_picture == null && $localStorage.id == null)
        {
            $localStorage.username = resp['data'][0]['user']['username']
            $localStorage.fullname = resp['data'][0]['user']['full_name']
            $localStorage.profile_picture = resp['data'][0]['user']['profile_picture']
            $localStorage.id = resp['data'][0]['user']['profile_picture']
        }
    }

    $scope.resetAll = function() {
    alert('Deleting saved tokens for all Accounts!');
    $localStorage.$reset();
}

});
