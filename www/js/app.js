// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    setupPush();

  });
})

this.setupPush = function () {
  if (localStorage.senderID == '[object Object]') {
    //localStorage.senderID = "918469035747";  
    localStorage.senderID = "";
  }  

  if (localStorage.notifications == '[object Object]') {
    localStorage.notifications = "[]";
  }

  var push = PushNotification.init({
     "android": {
         "senderID": localStorage.senderID
     },
     "ios": {
       "sound": true,
       "alert": true,
       "badge": true
     },
     "windows": {}
  });


  push.on('registration', function(data) {
     console.log("registration event: " + data.registrationId);
     var oldRegId = localStorage.registrationId;
     if (oldRegId !== data.registrationId) {
         // Save new registration ID
         localStorage.registrationId = data.registrationId;
         // Post registrationId to your app server as the value has changed
         console.log("a new regID has been archived");
     }
  });

  push.on('notification', function(data) {
         console.log("notification event");

         var notifications = [];

         if (localStorage.notifications != '[object Object]') {
         //   console.log("FZG ********** recuperando desde localStorage");
            notifications = JSON.parse(localStorage.notifications);

            //$scope.notifications.push(JSON.stringify(notification.alert));
         }

         var notification = {};

         notification.time = Date.now();
         notification.message = data.message;
         notification.title = data.title;

         notifications.push(notification);

         localStorage.notifications = JSON.stringify(notifications);

         locationMedia = "";
         if (device.platform == "Android"){
            locationMedia = "/android_asset";
         }
         locationMedia = locationMedia + "/www/sound/beep.wav";

         playSound(locationMedia);

         window.plugins.toast.showShortTop('A new notification has been received.');

     }); 

  push.on('error', function(e) {
     console.log("push error during setup  = " + e.message);
  });
};

this.playSound = function(mediaFile) {
  var my_media = new Media(mediaFile,
    // success callback
    function () {
        console.log("playAudio():Audio Success");
    },
    // error callback
    function (err) {
        console.log("playAudio():Audio Error: " + err);
    }
  );
  // Play audio
  my_media.play();
};





