// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services' ])



.run(function($ionicPlatform, SecurityService) {
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

    //var access_token = SecurityService.getToken();

  });
})



this.setupPush = function() {

localStorage.senderID = "281258853994"; 
  if (localStorage.senderID == '[object Object]' || localStorage.senderID == 'undefined') {
    localStorage.senderID = "281258853994";  
    //localStorage.senderID = "";
  }  

localStorage.notifications = "[]";
  if (localStorage.notifications == '[object Object]' || localStorage.notifications == 'undefined') {
    localStorage.notifications = "[]";
  }

  console.log("FZG ********* antes de asignar por defecto localStorage.registrationId.");
  if (localStorage.registrationId == '[object Object]' || localStorage.registrationId == 'undefined') {
    localStorage.registrationId = "";
  }

  console.log("FZG ********* antes de asignar por defecto localStorage.currentRegistrationId.");
  if (localStorage.currentRegistrationId == '[object Object]' || localStorage.currentRegistrationId == 'undefined') {
    localStorage.currentRegistrationId = "";
  }  

  console.log("FZG ********* despues de asignar por defecto localStorage.registrationId.");
  console.log("FZG ********* valor despues de asignar:"+ localStorage.registrationId);

  console.log("FZG ********* despues de asignar por defecto localStorage.currentRegistrationId.");
  console.log("FZG ********* valor despues de asignar:"+ localStorage.currentRegistrationId);

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

    localStorage.registrationId = data.registrationId;
    if (localStorage.currentRegistrationId !== localStorage.registrationId) {
       //localStorage.currentRegistrationId = localStorage.registrationId;
    };
     

  });

  push.on('notification', function(data) {
    console.log("notification event");

    var notifications = [];

    if (localStorage.notifications != '[object Object]') {
      notifications = JSON.parse(localStorage.notifications);
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












