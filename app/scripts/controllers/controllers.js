'use strict';

/* Controllers */

var mainExtensionController = angular.module('mainExtensionController', []);


function ExtListCtrl($scope, $http) {
	var model = $scope.model = {};

	// 'mock/all_extensions.json'

	$http.get('/getAllExtensions').success(function(data){
		$scope.extensions = data;
	});

    $scope.selectRow = function(row) {
        $scope.selectedRow = row;
    };
}

mainExtensionController.controller('ExtListCtrl', ['$scope', '$http', ExtListCtrl]);

function BaseCtrl($scope, $location) {
	$scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
}

mainExtensionController.controller('BaseCtrl', ['$scope', '$location', BaseCtrl]);



// viewExtensionController.controller('extListCtrl', ['$scope', '$location', '$http',
// 	function ($scope, $location, $http) {
// 		var model = $scope.model = {};
// 		$scope.hidden = false;

// 		// when landing on the page, get all todos and show them
// 		$http.get('/view')
// 		console.log("i am here");
// 			.success(function(data) {
// 				$scope.extensions = data;
// 			})
// 			.error(function(data) {
// 				console.log('Error: ' + data);
// 			});

// 		$scope.selectRow = function(row) {
//             $scope.selectedRow = row;
//         };

//         $scope.isActive = function (viewLocation) {
//             var active = (viewLocation === $location.path());
//             return active;
//         };

// 	}]);

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

