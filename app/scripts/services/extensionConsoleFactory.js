/* global  angular */

(function () {
    "use strict";
		
    var extensionConsoleFactory = function($resource, $http) {
        var factory = {};

        factory.registerExtension = function(extension){
            // Mock
            factory.extensionList.push(extension);
            // return $http.post("/registerExtension/", JSON.stringify(extension));
        };

        factory.getExtensionList = function() {
            // Mock
            return $http.get('mock/all_extensions.json');
            // return $http.get('/getAllExtensions');
        };
		
		factory.getExtensionDetails = function(extensionName) {
			// Mock
			return $http.get('mock/extension_details.json');
			// return $http.get('/getExtensionDetails/' + extensionName);
		};

		factory.getExecutionList = function(extensionName) {
			// Mock 
			return $http.get('mock/monitor_list.json');
			// return $http.get('/getExecutions/' + extensionName);
		};
		
		factory.getExecutionDetails = function(extensionName, executionId) {
			// Mock
			return $http.get('mock/monitor_details.json');
			// return $http.get('/getExecutionDetails' + extensionName + '/' + executionId);
		};
	
        factory.getConfigPropertyList = function(extensionName, versionId){
            // Mock
            return $http.get('mock/property_list.json');
            // return $http.get('/getConfigProperties/' + extensionName + '/' + versionId);
        };

        factory.getConfiguration = function(extensionName, versionId, profile){
            return $http.get("/getConfig/"+ extensionName+"/" + versionId + "/" + profile);
        };
	
        factory.saveConfiguration = function(newConfig, extensionName, versionId, profile){
            console.log("Posting to node..." + JSON.stringify(newConfig));
            return $http.post("/saveConfig/"+ extensionName+"/" + versionId + "/" + profile, JSON.stringify(newConfig));
        };
		        
        return factory;
    };

    angular.module("extensionConsole").factory("extensionConsoleFactory", ["$resource", "$http", extensionConsoleFactory]);
}());