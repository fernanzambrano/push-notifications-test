angular.module('app.services', [])
.factory('SecurityService', function($http) {

	var access_token = "";
	var interfaz = {
		getToken: getToken,
		forceSearchToken: forceSearchToken
	}

	return interfaz;

	function forceSearchToken() {
		acces_token = "";
		searchToken();
		while (access_token == ""); //waiting
		return access_token;
	}

	function getToken() {
		if (access_token != "") {
			return access_token;
		} else {
			searchToken();
			return access_token;
		}		
	}

	function searchToken() {
		var url = "https://nakatomi.gsnetcloud.com/token";
		var credentials = "Basic SU82TDgyVWZSQTlyck54bDlJcFpnU2REQWxFYTpRYU1MSTBuek5PTFJ6aDRkaEhoTjZTUzZMeVVh";
		var config = {
			headers: {
		    	'Authorization': credentials,
		    	'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    timeout: 20000
		}
		var data = "grant_type=client_credentials";

		$http.post(url, data, config)
		.success(function (data, status, headers, config) {
	    	if (status == 200) {
	      		access_token = data.access_token;	      
	    	}
	    	console.log("SUCCESS - status: "+ status + " data: "+ JSON.stringify(data));
	  	})
	  	.error(function (data, status, headers, config) {
			console.log("ERROR - Getting token - status: "+ status + " data: "+ JSON.stringify(data));
	  	});
	}
})








// .service('DevicesExtManagerService', [DevicesExtManagerService])


// var DevicesExtManagerService = function($http) {
//   this.$http = $http;
//   this.urlDeviceManager = 'https://nakatomi.gsnetcloud.com/push-public';
// };
// DevicesExtManagerService.$inject = ['$http'];
// DevicesExtManagerService.prototype.register = function(acces_token, platform, registrationId, uid, email ) {

// 	var url = this.urlDeviceManager + '/api/1/devices';

// 	var config = {
// 	    headers : {
// 	        'Authorization': 'Bearer ' + acces_token,
// 	        'Content-Type': 'application/json',
// 	        'Accept': 'application/json'
// 	    }
// 	}

// 	var data = {};
// 	data.platform = platform;
// 	data.registerId = registrationId;
// 	data.uid = uid;
// 	data.email = email;

// 	var response = {};

// 	this.$http.post(url, data, config)
// 	.success(function (data, status, headers, config) {

// 		response.detailedResponse = getDetailResponse(data, status, header, config);

// 		response.status = status;
// 		if (status == 201) {
// 			response.applicationId = data.applicationId;
// 			response.deviceId = data.deviceId;
// 			response.platform = data.platform;
// 		} else {
// 			response.code = data.code;
// 			response.message = data.message;
// 		}
// 	})
// 	.error(function (data, status, header, config) {
// 		response.detailedResponse = getDetailResponse(data, status, header, config);
// 	});

// 	return response;	

// };

// DevicesExtManagerService.prototype.update = function(acces_token, deviceId, registrationId ) {

// 	var url = this.urlDeviceManager + '/api/1/devices/' + deviceId;

// 	var config = {
// 	    headers : {
// 	        'Authorization': 'Bearer ' + acces_token,
// 	        'Content-Type': 'application/json',
// 	        'Accept': '*/*'
// 	    }
// 	}

// 	var data = {};
// 	data.registerId = registrationId;

// 	var response = {};

// 	this.$http.patch(url, data, config)
// 	.success(function (data, status, headers, config) {

// 		response.detailedResponse = getDetailResponse(data, status, header, config);

// 		response.status = status;
// 		if (status != 204) {
// 			response.code = data.code;
// 			response.message = data.message;
// 		}
// 	})
// 	.error(function (data, status, header, config) {
// 		response.detailedResponse = getDetailResponse(data, status, header, config);
// 	});

// 	return response;	

// };

