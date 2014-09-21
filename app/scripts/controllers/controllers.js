'use strict';

/* Controllers */

var mainExtensionController = angular.module('mainExtensionController', []);


function ExtListCtrl($scope, $http) {
	var model = $scope.model = {};

	$scope.extensions = 'mock/all_extensions.json'

	// $http.get('/getAllExtensions').success(function(data){
	// 	$scope.extensions = data;
	// })
	// .error(function(data){
	// 	console.log('Error: ' + data);
	// });

    $scope.highlightRow = function(rowIndex, extension) {
		$scope.clickedExtension = extension;
		$scope.selectedRow = rowIndex;
	};
}

mainExtensionController.controller('ExtListCtrl', ['$scope', '$http', ExtListCtrl]);

function BaseCtrl($scope, $location) {

	$scope.isDropdownMenuItem = function() {
		var dropdownMap = {'/create' : 'Register Extension', '/manage' : 'Manage Extension'};
		var currentPath = $location.path();

		if (currentPath != '/view') {
			$scope.selectedItem = dropdownMap[currentPath];
			return true;
		} else {
			$scope.selectedItem = "Admin Tools";
			return false;
		}
	};

	$scope.isActive = function (viewLocation) {
		var active = (viewLocation === $location.path());
		return active;
    };
}

mainExtensionController.controller('BaseCtrl', ['$scope', '$location', BaseCtrl]);

function ManageExtCtrl($scope, $http) {
	$scope.syncExtensions = function() {
		$http.get('/syncExtensions').success(function(statusCode){
			if (statusCode == '200') {
				console.log("Successfully synced with Nexus service manually!");
			} else {
				console.log("Failed to sync with Nexus service manually..." + statusCode);
			}
		})
		.error(function(statusCode){
			console.log('Error: ' + statusCode);
		});
	};
}

mainExtensionController.controller('ManageExtCtrl', ['$scope', '$http', ManageExtCtrl]);

  //   $scope.getExtensions = function() {
		// var list = [{"inserted":1395273380261,"updated":1395273380261,"extensionName":"jobs-lexus-response-pdf-export","repositoryType":"MAVEN","versions":[],"groupId":"com.medallia.apps","artifactId":"jobs-lexus-response-pdf-export","repositoryId":"releases"},
  //       {"inserted":1395350577969,"updated":1395350577969,"extensionName":"commons-config","repositoryType":"MAVEN","versions":[],"groupId":"com.medallia.apps","artifactId":"commons-config","repositoryId":"releases"},
  //       {"inserted":null,"updated":null,"extensionName":"app_name","repositoryType":null,"versions":[{"inserted":null,"updated":null,"rowVersion":1,"extension":null,"version":"1.0","document":{"inserted":null,"updated":null,"url":"http://hive.medallia.com/my_first_app"}}]}];
        
  //       return list;
  //   };

  //   $scope.getConfigurations = function(appName, version) {
  //       var configs = [{"propertyName":"prop1","propertyType":"String","nullable":true,"defaultValue":"defaultvalue"},
  //       {"propertyName":"prop2","propertyType":"String","nullable":false,"defaultValue":null}];

  //       return configs;
  //   };

  //   $scope.syncExtensions = function() {
  //       console.log("synced!");
  //   };

  //   $scope.registerExtension = function(extension){
		// console.log("registered!");
  //   };

