angular.module('app.services', [])
.factory('SecurityService', function($http, $q) {
	var url;
	var credentials;

	var access_token = "";
	var service = {
		init: init,
		getToken: getToken,
		searchToken: searchToken
	}

	return service;

	function init(securityEndPoint, securityCredentials) {
		url = securityEndPoint;
		credentials = securityCredentials;		
	}

	function getToken() {
		return access_token;		
	}

	function searchToken() {
		var defered = $q.defer();
        var promise = defered.promise;	

		var config = {
			headers: {
		    	'Authorization': 'Basic '+ credentials,
		    	'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    timeout: 20000
		}
		var data = "grant_type=client_credentials";

		$http.post(url, data, config)
		.success(function (data, status, headers, config) {
			console.log("SUCCESS - Getting token - status: "+ status + " data: "+ JSON.stringify(data));

			var response = {};
	    	if (status == 200) {
	      		access_token = data.access_token;
	      		response.acces_token = data.access_token;	      
	    	}
	    	defered.resolve(response);

	  	})
	  	.error(function (data, status, headers, config) {
			console.log("ERROR - Getting token - status: "+ status + " data: "+ JSON.stringify(data));

			var err = {};
			err.status = status;
			err.data = JSON.stringify(data);
			defered.reject(err);			
	  	});

	  	return promise;
	}
})

.factory('DevicesExtManagerService', function($http, $q, SecurityService) {
	var service = {
		init: init,
		register: register,
		updatePartial: updatePartial,
		unregister: unregister
	}

	return service;

	function init(deviceEndPoint) {
		url = deviceEndPoint;	
	}

	function register(platform, registrationId, uid, email) {
        var defered = $q.defer();
        var promise = defered.promise;		

		acces_token = SecurityService.getToken();

		var credentials = "Bearer "+ acces_token;
		var config = {
			headers: {
	 	        'Authorization': credentials,
 		        'Content-Type': 'application/json',
 	    	    'Accept': 'application/json'		    	
		    },
		    timeout: 20000
		}
		var data = {};
		data.platform = platform;
		data.registerId = registrationId;
		data.uid = uid;
		data.email = email;

		$http.post(url, data, config)
		.success(function (data, status, headers, config) {
	    	console.log("SUCCESS - registering device - status: "+ status + " data: "+ JSON.stringify(data));

	    	var response = {};
	    	if (status == 201) {
	    		response.deviceId = data.deviceId;
	    		response.platform = data.platform;
	    		response.applicationId = data.applicationId;   
	    	}
	    	defered.resolve(response);	    	
	  	})
	  	.error(function (data, status, headers, config) {
			console.log("ERROR - registering device - status: "+ status + " data: "+ JSON.stringify(data));

			var err = {};
			err.status = status;
			err.data = JSON.stringify(data);
			err.code = data.code;
			err.message = data.message;
			defered.reject(err);
	  	});

	  	return promise;
	};

	function updatePartial(deviceId, registrationId) {
        var defered = $q.defer();
        var promise = defered.promise;		

		acces_token = SecurityService.getToken();

		var urlToUpdate = url + "/" + deviceId;
		var credentials = "Bearer "+ acces_token;
		var config = {
			headers: {
	 	        'Authorization': credentials,
	 	        'Content-Type': 'application/json',
	 	        'Accept': '*/*'		    	
		    },
		    timeout: 20000
		}
	 	var data = {};
	 	data.registerId = registrationId;

		$http.patch(urlToUpdate, data, config)
		.success(function (data, status, headers, config) {
	    	console.log("SUCCESS - partial updating device - status: "+ status);

	    	var response = {};
			response.status = status;

	    	defered.resolve(response);	    	
	  	})
	  	.error(function (data, status, headers, config) {
			console.log("ERROR - partial updating device - status: "+ status + " data: "+ JSON.stringify(data));

			var err = {};
			err.status = status;
			err.data = JSON.stringify(data);
			err.code = data.code;
			err.message = data.message;
			defered.reject(err);
	  	});

	  	return promise;
	};

	function unregister(deviceId) {
        var defered = $q.defer();
        var promise = defered.promise;		

		acces_token = SecurityService.getToken();

		var urlToDelete = url + "/" + deviceId;
		var credentials = "Bearer "+ acces_token;
		var config = {
			headers: {
	 	        'Authorization': credentials,
	 	        'Accept': '*/*'		    	
		    },
		    timeout: 20000
		}

		$http.delete(urlToDelete, config)
		.success(function (data, status, headers, config) {
	    	console.log("SUCCESS - unregistering device - status: "+ status);

	    	var response = {};
			response.status = status;

	    	defered.resolve(response);	    	
	  	})
	  	.error(function (data, status, headers, config) {
			console.log("ERROR - unregistering device - status: "+ status + " data: "+ JSON.stringify(data));

			var err = {};
			err.status = status;
			err.data = JSON.stringify(data);
			err.code = data.code;
			err.message = data.message;
			defered.reject(err);
	  	});

	  	return promise;
	};
})