// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services' ])

.run(function($ionicPlatform, SecurityService, DevicesExtManagerService) {
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

    initLocalStorage();
    setup(SecurityService, DevicesExtManagerService);
  });
})

this.senderID = "";
this.securityEndPoint = "https://nakatomi.gsnetcloud.com/token";
this.securityCredentials = "";
this.deviceEndPoint = "https://nakatomi.gsnetcloud.com/push-public/api/1/devices";

this.setup = function(SecurityService, DevicesExtManagerService) {
  SecurityService.init(securityEndPoint, securityCredentials);

  SecurityService
    .searchToken()
    .then(function(response) { 
      setupPush(DevicesExtManagerService);                   
    })
    .catch(function(err) {
      console.log("ERROR - Setting up app - status: "+ err.status + " data: "+ err.data);
    });
};

this.setupPush = function(DevicesExtManagerService) {
  DevicesExtManagerService.init(deviceEndPoint);  

  var push = PushNotification.init({
     "android": {
         "senderID": localStorage.senderID,
         "clearNotifications": false
     },
     "ios": {
       "sound": true,
       "alert": true,
       "badge": true
     },
     "windows": {}
  });

  push.on('registration', function(data) {
    localStorage.newRegistrationId = data.registrationId;
    if (localStorage.newRegistrationId != localStorage.registrationId) {
      if (localStorage.deviceId == "") { //Register in push-public service. First time.
        if (localStorage.uid != "" && localStorage.mail != "") { //If the device has uid and email
          DevicesExtManagerService
            .register(device.platform.toLowerCase(), localStorage.newRegistrationId, localStorage.uid, localStorage.mail)
            .then(function(response) {
              localStorage.registrationId = localStorage.newRegistrationId;
              localStorage.deviceId = response.deviceId;
            })
            .catch(function(err) {
              console.log("ERROR - Setting up app - registering device - status: "+ err.status + " data: "+ err.data);
            });
        }
      } else { //Update registrationId in push-public service.
        DevicesExtManagerService
          .updatePartial(localStorage.deviceId, localStorage.newRegistrationId)
          .then(function(response) {        
            localStorage.registrationId = localStorage.newRegistrationId;
          })
          .catch(function(err) {
            console.log("ERROR - Setting up app - updating device - status: "+ err.status + " data: "+ err.data);
          });
      }
    }    
  });
     
  push.on('notification', function(data) {
    console.log("notification event");
    console.log("FZG data notification:"+ JSON.stringify(data));

    var notifications = notifications = JSON.parse(localStorage.notifications);
    var notification = {};

    notification.time = new Date().toUTCString();
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

this.initLocalStorage = function() {
  if (localStorage.senderID == undefined) {
    localStorage.senderID = senderID;  
  }

  if (localStorage.registrationId == undefined) {
    localStorage.registrationId = "";
  }

  if (localStorage.newRegistrationId == undefined) {
    localStorage.newRegistrationId = "";
  }

  if (localStorage.deviceId == undefined) {
    localStorage.deviceId = "";
  }

  if (localStorage.uid == undefined) {
    localStorage.uid = "";
  }  

  if (localStorage.mail == undefined) {
    localStorage.mail = "";
  }   
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