/* global angular */
(function () {
    "use strict";

    /** Help:
    http://stackoverflow.com/questions/13088153/how-to-http-synchronous-call-with-angularjs
    https://groups.google.com/forum/#!topic/angular/qagzXXhS_VI/discussion
    http://stackoverflow.com/questions/21239266/angularjs-using-q-to-fire-ajax-calls-synchronously
    **/

    var viewExecutionsCtrl = function ($scope, extensionConsoleFactory, executionService, $modal, $log) {

        var model = $scope.model = {};
		$scope.activeRow = executionService.getActiveRow();
        model.extensionList = [];
		model.executionInfo = executionService.getAllExecutionInfo();

        // Get all the extensions
        model.getAllExtensions = function() {
            extensionConsoleFactory.getExtensionList()
                        .success(function(data){
                            model.extensionList = data;
                        });
        };
				
		// TODO - Improve! This is to fetch execution info for an app when user clicks the row in viewExecutionInfo.html
		$scope.loadAndSaveExecutionInfo = function(extensionName, hidden, rowIndex) {			
			// Only load when opening up the sub-table
			if (hidden) {
	            // Used to highlight the selected row
				$scope.activeRow[rowIndex] = true;
				extensionConsoleFactory.getExecutionList(extensionName)
									.success(function(data){
										executionService.setExecutionInfo(extensionName, data['executionInfoSet']);
									});
			} else {
				// Unhighlight the row
				$scope.activeRow[rowIndex] = false;				
			}
			executionService.setActiveRow($scope.activeRow);
		}
				
        var init = function() {
			console.log("Initializing... getting all the extensions");
            model.getAllExtensions();
        };
        init();

    };

    angular.module("extensionConsole").controller("viewExecutionsCtrl", ["$scope", "extensionConsoleFactory", "executionService", "$modal", "$log", viewExecutionsCtrl]);
	
	var viewExecutionsDetailsCtrl = function($scope, $routeParams, extensionConsoleFactory, executionService, $modal, $log) {
		
		var model = $scope.model = {};
		model.executionInfo = {};
				
		model.getExecutionDetails = function(extensionName, executionId) {
			var executions = executionService.getExecutionInfo(extensionName);
			
			if (executions) {
				console.log("fetch from cache");
				model.executionInfo = getExecution(executions, executionId);
			} 
			
			// No saved data; then go and fetch from API			
			if(Object.keys(model.executionInfo).length === 0) {
				console.log("fetch from api");
				extensionConsoleFactory.getExecutionList(extensionName)
					.success(function(data){
						model.executionInfo = getExecution(data['executionInfoSet'], executionId);
						// Make sure to save the goodies
						executionService.setExecutionInfo(extensionName, data['executionInfoSet']);
					});
			}
		}
		
		var getExecution = function(executions, executionId) {
			for (var i in executions) {
				if (executions[i]['executionId'] == executionId) {
					return executions[i];
				}
			}
			return {};
		};
		
        var init = function() {
			console.log("Initializing... getting details for " + $routeParams.appName + "/" + $routeParams.executionId);
            model.getExecutionDetails($routeParams.appName, $routeParams.executionId);
        };
        init();		
	};
	
    angular.module("extensionConsole").controller("viewExecutionsDetailsCtrl", ["$scope", "$routeParams", "extensionConsoleFactory", "executionService", "$modal", "$log", viewExecutionsDetailsCtrl]);
	
}());