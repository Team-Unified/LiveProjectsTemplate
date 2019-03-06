angular.module('starter', ['ngStorage', 'ngCordovaOauth', 'ionic'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {

            if (window.cordova && window.Keyboard) {
                window.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .controller("homeController", function ($scope,$cordovaOauth,$localStorage) {

        var empty = "";

        $scope.$storage = $localStorage.$default({ instagram: empty, twitter: empty, linkedIn: empty, reddit: empty, facebook: empty, });

        var instagramRequest = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';
        var redditRequest = "https://api.reddit.com/r/";    
        var subreddit = "";
        var resp;

        //instagram login
        $scope.instagramLogin = function () {
            //is userAuthenticated? if so don't continue authentication
            var isInstagramAuthenticated = new Boolean(false);
            if ($localStorage.instagram != null) {
                isInstagramAuthenticated = true;
                alert("You're already authenticated with Instagram!");
            }
            else
                $cordovaOauth.instagram("CLIENT_ID", ["basic"]).then(function (result) {
                    $localStorage.instagram = result.access_token;
                }, function (error) {
                    console.log(JSON.stringify(error));
                });
        }
        
        $scope.instagramUpdate = function () {

            req = instagramRequest + $localStorage.instagram;
            var xhr = new XMLHttpRequest()
            xhr.open("GET", req)
            xhr.send()
            xhr.onload = () => resp = JSON.parse(xhr.response);

            // this needs to be done in like a ForEach or something along them lines for how it works for Instagram, 
            // so then it will loop as many times there's objects in the response
            // right now i save the response to local storage, when i finish this to work the way it should then we won't need local storage?

            var length = [resp['data'].length];
            var images = [length];
            var caption_text = [length];
            var created_time = [length];

            for (let i = 0; i < resp['data'].length; i++) {
                //if a video is added it doesnt currently work, need to fix this or add it as an enhancement
                images[i] = resp['data'][i]['images']['standard_resolution']['url']

                //checks if the created_time exists at this path (only for no caption posts), if not it uses the path if the post has a caption
                if (!resp['data'][i]['created_time']) {
                    created_time[i] = new Date(parseInt(resp['data'][i]['caption']['created_time']) * 1000).toLocaleString()
                }
                else { created_time[i] = new Date(parseInt(resp['data'][i]['created_time']) * 1000).toLocaleString() }

                //checks if the caption exists at this path (only for no caption posts), if not it uses the path if the post has a caption
                if (!resp['data'][i]['caption']) {
                    caption_text[i] = "No Caption Available"
                }
                else { caption_text[i] = resp['data'][i]['caption']['text'] }
            }

            $localStorage.image_post = images;
            $localStorage.caption_text = caption_text;
            $localStorage.created_time = created_time;

            //hardcoded to pull this from the first entry in the array since it only needs to be fetched once
            //only fetch if the localstorage is null, since these values can be reused
            while ($localStorage.username == null && $localStorage.fullname == null && $localStorage.profile_picture == null && $localStorage.id == null) {
                $localStorage.username = resp['data'][0]['user']['username']
                $localStorage.fullname = resp['data'][0]['user']['full_name']
                $localStorage.profile_picture = resp['data'][0]['user']['profile_picture']
                $localStorage.id = resp['data'][0]['user']['profile_picture']
            }
        }

        //linkedin login
        $scope.linkedinLogin = function () {
            //is userAuthenticated? if so don't continue authentication
            var isLinkedinAuthenticated = new Boolean(false);
            if ($localStorage.linkedIn != null) {
                isLinkedinAuthenticated = true;
                alert("You're already authenticated with Linkedin!");
            }
            else
            $cordovaOauth.linkedin("CLIENT_ID", "SECRET", ["r_basicprofile", "r_emailaddress"], "teamunified-mmu-12345").then(function(result) {
                $localStorage.instagram = result.access_token;
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }

        //twitter login
        $scope.twitterLogin = function () {
              //is userAuthenticated? if so don't continue authentication
              var isTwitterAuthenticated = new Boolean(false);
              if ($localStorage.twitter != null) {
                  isTwitterAuthenticated = true;
                  alert("You're already authenticated with Twitter!");
              }
              else
            $cordovaOauth.twitter("CLIENTID","CLIENTSECRET").then(function(result) {
                $localStorage.instagram = result.access_token;
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }

        $scope.redditUpdate = function () {
            //set the var to that of which input tag is 
            subreddit = angular.element('#query').val()
            //sitch together req url, subreddit, and top to JSON 
            req = redditRequest + subreddit + "/top.json?";
            //used for debug, making sure the URL is joined together as expected
            console.log("API GET request sent to URL: " + req)
            var xhr = new XMLHttpRequest()
            xhr.open("GET", req)
            xhr.send()
            xhr.onload = () => resp = JSON.parse(xhr.response);  
        }

        //facebook login
        $scope.facebookLogin = function () {
              //is userAuthenticated? if so don't continue authentication
              var isFacebookAuthenticated = new Boolean(false);
              if ($localStorage.facebook != null) {
                  isFacebookAuthenticated = true;
                  alert("You're already authenticated with Facebook!");
              }
              else
            $cordovaOauth.facebook("CLIENT_ID", ["email"], {"auth_type": "rerequest"}).then(function(result) {
                $localStorage.instagram = result.access_token;
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }

        $scope.resetAll = function () {
            alert('Deleting cached files and tokens');
            $localStorage.$reset();
        }

    });