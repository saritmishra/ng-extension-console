/* global angular */
(function () {
    "use strict";

    /** Help:
    http://stackoverflow.com/questions/13088153/how-to-http-synchronous-call-with-angularjs
    https://groups.google.com/forum/#!topic/angular/qagzXXhS_VI/discussion
    http://stackoverflow.com/questions/21239266/angularjs-using-q-to-fire-ajax-calls-synchronously
    **/

    var viewExecutionsCtrl = function ($scope, extensionConsoleFactory, $modal, $log) {

        var model = $scope.model = {};
		$scope.activeRow = {};
        model.extensionList = [];
		model.executionInfoList = [];

        // Get all the extensions
        model.getAllExtensions = function() {
            extensionConsoleFactory.getExtensionList()
                        .success(function(data){
                            model.extensionList = data;
                        });
        };
				
		// TODO - Improve! This is to fetch execution info for an app when user clicks the row in viewExecutionInfo.html
		$scope.loadExecutionInfo = function(extensionName, hidden, rowIndex) {					
			// Only load when opening up the subtable
			if (hidden) {
	            // Used to highlight the selected row
				$scope.activeRow[rowIndex] = true;				
				extensionConsoleFactory.getExecutionList(extensionName)
									.success(function(data){
										model.executionInfoList = data['executionInfoSet'];
									});
			} else {
				// Unhighlight the row
				$scope.activeRow[rowIndex] = false;				
			}
		}
		
        var init = function() {
			console.log("Initializing... getting all the extensions");
            model.getAllExtensions();
        };
        init();

    };

    angular.module("extensionConsole").controller("viewExecutionsCtrl", ["$scope", "extensionConsoleFactory", "$modal", "$log", viewExecutionsCtrl]);
	
	var viewExecutionsDetailsCtrl = function($scope, $routeParams, extensionConsoleFactory, $modal, $log) {
		
		var model = $scope.model = {};
		model.executionInfo = {};
		
		model.getExecutionInfo = function(extensionName, executionId) {
			extensionConsoleFactory.getExecutionDetails(extensionName, executionId)
				.success(function(data){
						model.executionInfo = data;
				});
		}
		
        var init = function() {
			console.log("Initializing... getting details for " + $routeParams.appName + "/" + $routeParams.executionId);
            model.getExecutionInfo($routeParams.appName, $routeParams.executionId);
        };
        init();		
	};
	
    angular.module("extensionConsole").controller("viewExecutionsDetailsCtrl", ["$scope", "$routeParams", "extensionConsoleFactory", "$modal", "$log", viewExecutionsDetailsCtrl]);
	
}());