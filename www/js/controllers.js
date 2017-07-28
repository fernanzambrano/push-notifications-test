angular.module('app.controllers', [])
     
.controller('listOfNotificationsCtrl', ['$scope', '$stateParams',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

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
   
.controller('deviceInfoCtrl', ['$scope', '$stateParams', 'SecurityService', deviceInfoCtrl  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
])


.controller('configurationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	this.senderID = localStorage.senderID;

	this.registerConfiguration = function() {
		localStorage.senderID = this.senderID;
	};

}])


function deviceInfoCtrl($scope, $stateParams, SecurityService) {

	this.regID = localStorage.registrationId;
	this.platform = device.platform;

	this.registerDevice = function() {
		var access_token = SecurityService.getToken();	
		console.log(access_token);
	}

	this.unRegisterDevice = function() {
		var access_token = SecurityService.forceSearchToken();
		console.log(access_token);		
	}	









		// console.log("FZG ******************");
		// console.log("status:"+ response.status);
		// console.log("detailedResponse:"+ response.detailedResponse);
		// console.log("response.access_token:"+ response.access_token);
		// console.log("response.expires_in:"+ response.expires_in);
		// console.log("response.error:"+response.error);
	 //    console.log("response.error_description:"+ response.error_description);
	 //    console.log("FZG ******************");		
  





};

	// this.urlSecurityToken = "https://nakatomi.gsnetcloud.com/token";

	// var url = this.urlSecurityToken;
	// var credentials = "Basic SU82TDgyVWZSQTlyck54bDlJcFpnU2REQWxFYTpRYU1MSTBuek5PTFJ6aDRkaEhoTjZTUzZMeVVh";
	// var config = {
	// 	headers : {
	//     	'Authorization': credentials,
	//     	'Content-Type': 'application/x-www-form-urlencoded'
	//     }
	// }

	// var data = "grant_type=client_credentials";
	//  var response = {};

	// 	  $http.post(url, data, config)
	//   .success(function (data, status, headers, config) {

	// console.log("FZG ******************* estoy en ");

	//     response.detailedResponse = getDetailResponse(data, status, headers, config);

	// console.log("FZG ******************* estoy en ");

	//     response.status = status;
	//     if (status == 200) {
	//       response.access_token = data.access_token;
	//       response.expires_in = data.expires_in;
	//     }

	//     if (status == 401) {
	//       response.error = data.error;
	//       response.error_description = data.error_description;
	//     }

	//   console.log("FZG *******"+ response.access_token);
	//   console.log("FZG *******"+ response.expires_in);


	//   })
	//   .error(function (data, status, header, config) {
	//   	console.log("FZG ******************* estoy en ");
	//   	console.log("FZG ******************* status: "+ status);
	//     response.detailedResponse = getDetailResponse(data, status, headers, config);
	//   });



	//registerDevice();

	// function registerDevice() {


	// 			localStorage.currentRegistrationId = "";

	             
	// 	var receivedRegId = localStorage.registrationId;
	//     var currentRegId = localStorage.currentRegistrationId;

	//     if (currentRegId == "") {
	//                console.log("FZG *********** paso por ");
	//       manageDevice('register', receivedRegId, '');
	//     } else {
	//       if (currentRegId !== receivedRegId) {
	//         manageDevice('update', receivedRegId, localStorage.deviceId);        
	//       }     
	//     } 	
	// };

	// function manageDevice(operation, registrationId, deviceId) {


	// console.log("FZG *********** paso por ");

	//   var response = getToken();
	//   if (response.status == 200) {
	//     var access_token = response.access_token;

	//     if (operation === 'register') {
	//       //response = this.DevicesExtManager.register(acces_token, 'android', registrationId, 'n034636', fezambrano@produban.com);
	//     } else {
	//       //response = DevicesExtManager.update(acces_token, deviceId, registrationId);
	//     }

	//     if (response.status == 200 && operation === 'register') {
	//       // Post registrationId to your app server as a new device
	//       console.log("a new deviceId has been archived");
	//       // Save new registration ID
	//       localStorage.registrationId = registrationId;          
	//       localStorage.deviceId = response.deviceId;          
	//     }

	//     if (response.status == 200 && operation === 'update') {
	//       // Post registrationId to your app server as the value has changed
	//       console.log("a deviceId has been updated");
	//       // Save new registration ID
	//       localStorage.registrationId = registrationId;               
	//     }
	//   }
	// };


	// function getToken($http) {

	//   this.urlSecurityToken = 'https://nakatomi.gsnetcloud.com/token';
	//           console.log("FZG ******************* estoy en ");
	//   var url = this.urlSecurityToken;

	//         console.log("FZG ******************* url:"+ url);

	//   //Basic ConsumerKey:ConsumerSecret Base64 format.
	//   var credentials = "Basic SU82TDgyVWZSQTlyck54bDlJcFpnU2REQWxFYTpRYU1MSTBuek5PTFJ6aDRkaEhoTjZTUzZMeVVh";

	//       console.log("FZG ******************* estoy en ");
	//   var config = {
	//       headers : {
	//           'Authorization': credentials
	//       }
	//   };

	//   var data = "grant_type=client_credentials";

	//   var response = {};


	//         console.log("FZG ******************* estoy en ");

	//   $http.post(url, data, config)
	//   .success(function (data, status, headers, config) {

	// console.log("FZG ******************* estoy en ");

	//     response.detailedResponse = getDetailResponse(data, status, header, config);

	// console.log("FZG ******************* estoy en ");

	//     response.status = status;
	//     if (status == 200) {
	//       response.access_token = data.access_token;
	//       response.expires_in = data.expires_in;
	//     }

	//     if (status == 401) {
	//       response.error = data.error;
	//       response.error_description = data.error_description;
	//     }
	//   })
	//   .error(function (data, status, header, config) {
	//     response.detailedResponse = getDetailResponse(data, status, header, config);
	//   });

	//   return response;  

	// };

	// function getDetailResponse(data, status, header, config) {
	//   var detailedResponse = "Data: " + data + ' ' +
	//           "status: " + status + ' ' +
	//           "headers: " + header + ' ' +
	//           "config: " + config;

	//   return detailedResponse;  
	// };	




