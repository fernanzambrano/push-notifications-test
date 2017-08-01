angular.module('app.controllers', [])
     
.controller('listOfNotificationsCtrl', ['$scope', '$stateParams', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  if (localStorage.notifications == undefined) {
    localStorage.notifications = "[]";
  }

		console.log("FZG **********"+ localStorage.notifications);

		this.listnot = JSON.parse(localStorage.notifications);

		setInterval(function(){ document.getElementById('listnot-button1').click(); }, 3000);

		this.refreshNotifications = function () {
			this.listnot = JSON.parse(localStorage.notifications);
		};

		this.deleteNotifications = function () {

          navigator.notification.confirm(
              'You are going to delete all notifications. Are you sure?', // message
               onConfirm,            // callback to invoke with index of button pressed
              'Delete',           // title
              ['Yes','No']     // buttonLabels
          );

         function onConfirm(buttonIndex) {
         	if (buttonIndex == 1) {
				this.listnot = [];
				//localStorage.setItem('notifications', JSON.stringify(this.listnot));
				localStorage.notifications = JSON.stringify(this.listnot);
				window.plugins.toast.showShortBottom('Notifications have been removed.');      		
         	}
            //alert('You selected button ' + buttonIndex);
         }
		};
}])
   
.controller('deviceInfoCtrl', ['$scope', '$stateParams', 'DevicesExtManagerService', 'SecurityService', deviceInfoCtrl  
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
])


.controller('configurationCtrl', ['$scope', '$stateParams', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	this.senderID = localStorage.senderID;
	this.uid = localStorage.uid;
	this.mail = localStorage.mail;

	this.registerConfiguration = function() {
		localStorage.senderID = this.senderID;
		localStorage.uid = this.uid;
		localStorage.mail = this.mail;

		window.plugins.toast.showShortBottom("Configuration has been registered");
	};
}])

function deviceInfoCtrl($scope, $stateParams, DevicesExtManagerService, SecurityService) {	
	this.regID = localStorage.registrationId;
	this.platform = device.platform;
	this.deviceId = localStorage.deviceId; 

	this.registerDevice = function() {
		DevicesExtManagerService
			.register(this.platform.toLowerCase(), localStorage.registrationId, localStorage.uid, localStorage.mail)
			.then(function(response) {
				localStorage.deviceId = response.deviceId;
				window.plugins.toast.showShortBottom("Device registered with deviceId: "+ response.deviceId);
				
				$scope.deviceInf.deviceId = response.deviceId; 
			})
			.catch(function(err) {
				if (err.status == 401) {
					SecurityService.searchToken();
				}
				window.plugins.toast.showShortBottom("Fail to register device. Try again.");				
			});			
	}

	this.updatePartialDevice = function() {
		DevicesExtManagerService
			.updatePartial(localStorage.deviceId, localStorage.registrationId)
			.then(function(response) {				
				window.plugins.toast.showShortBottom("Device updated. DeviceId: "+ localStorage.deviceId);
			})
			.catch(function(err) {
				if (err.status == 401) {
					SecurityService.searchToken();
				}
				window.plugins.toast.showShortBottom("Fail to update device. Try again.");			
			});		
	}

	this.unRegisterDevice = function() {
		DevicesExtManagerService
			.unregister(localStorage.deviceId)
			.then(function(response) {				
				window.plugins.toast.showShortBottom("Device unregistered. DeviceId: "+ localStorage.deviceId);
			})
			.catch(function(err) {
				if (err.status == 401) {
					SecurityService.searchToken();
				}
				window.plugins.toast.showShortBottom("Fail to unregistered device. Try again.");			
			});
	}	
};