angular.module('app.controllers', [])
     
.controller('listOfNotificationsCtrl', ['$scope', '$stateParams',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

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
   
.controller('deviceInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	this.regID = localStorage.registrationId;
	this.platform = device.platform;

	this.registerDevice = function() {
		//Here we have to include the opeation to register de regID in the external server
	};

}])


.controller('configurationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	this.senderID = localStorage.senderID;

	this.registerConfiguration = function() {
		localStorage.senderID = this.senderID;
	};

}]) 