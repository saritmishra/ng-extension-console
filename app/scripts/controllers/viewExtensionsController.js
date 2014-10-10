/* global angular */
(function () {
    "use strict";

    /** Help:
    http://stackoverflow.com/questions/13088153/how-to-http-synchronous-call-with-angularjs
    https://groups.google.com/forum/#!topic/angular/qagzXXhS_VI/discussion
    http://stackoverflow.com/questions/21239266/angularjs-using-q-to-fire-ajax-calls-synchronously
    **/

    var viewExtensionsController = function ($scope, extensionConsoleFactory, extensionService, $modal, $log) {

        var model = $scope.model = {};
        // Used to show "details"
		$scope.show = extensionService.getVisualComponent()['show'];
		// Used to highlight the selected row
		$scope.selectedRow = extensionService.getVisualComponent()['activeRow'];
		$scope.clickedExtension = extensionService.getExtensionDetails();
        model.extensionList = [];
        model.configPropertyList = [];

        // Get all the extensions
        model.getAllExtensions = function() {
            extensionConsoleFactory.getExtensionList()
                        .success(function(data){
                            model.extensionList = data;
                        });
        };

        $scope.displayDetails = function(rowIndex, extension) {
            $scope.show = true;
            $scope.selectedRow = rowIndex;
			extensionService.setVisualComponent(true, rowIndex);
			
			// TODO - Improve! This is to fetch app info (versions etc) when user clicks the row in viewExtensions.html
			extensionConsoleFactory.getExtensionDetails(extension.extensionName)
							.success(function(data){
									$scope.clickedExtension = data;
									extensionService.setExtensionDetails(data);
							});
        };

        $scope.closeDetails = function() {
            $scope.show = false;
            $scope.selectedRow=undefined;

			// Clean the state
			extensionService.setVisualComponent(false, undefined);
			extensionService.setExtensionDetails({});
        };

        // S E T T I N G   U P   C O N F I G   E N T R Y   M O D A L   W I N D O W
        $scope.openConfigEntryModal = function (extensionName, versionId) {
            // Need to make sure to get list of config properties before doing anything
        	// TODO: Make this a parameter
        	var profile = "PROD"
        	var configuredProperties = {}
        	extensionConsoleFactory.getConfiguration(extensionName, versionId, profile).
        		then(function(response) {
				
				// If getConfiguration returns data, that means there is an exisiting config. 
        		if(response.status == 200 && response.data) {
	        		for(var i=0; i< response.data.length; i++) {
	        			var property = response.data[i];
	        			configuredProperties[property.name] = property.value; 
	        		}
        		}
        		$log.info("Already configured properties: " + configuredProperties);
                extensionConsoleFactory.getConfigPropertyList(extensionName, versionId)
                    .then(function(response) {
                        model.configPropertyList = response.data;
                        for(var i=0; i< model.configPropertyList.length; i++) {
                        	var configProperty = model.configPropertyList[i];
                        	configProperty.value = configuredProperties[configProperty.propertyName]
                        }                        
                        var modalInstance = $modal.open({
                          templateUrl: "views/configEntryView.html",
                          controller: "configEntryModalController",
                          resolve: { //making sure these are available to the modal controller
                            extensionName: function() {
                                return extensionName;
                            },
                            propertyList: function() {
                                return model.configPropertyList;
                            },
                            configuredProperties: function() {
                                return configuredProperties;
                            }
                          }
                        });

                        return modalInstance.result.then(function (updatedConfigPropertyList) {
                          //OK clicked on modal
                          extensionConsoleFactory.saveConfiguration(updatedConfigPropertyList, extensionName, versionId, profile);
                        }, function () {
                          //modal dismissed
                          $log.info("configEntry modal dismissed at: " + new Date());
                        });
                    
                    });
        	});
        	
        };

        // // S E T T I N G    U P   T H E   D E P L O Y   M O D A L   W I N D O W
        // $scope.openDeployModal = function () {
        //     var modalInstance = $modal.open({
        //       templateUrl: "views/deployExtensionModalView.html",
        //       controller: "deployExtensionModalController",
        //       // size: "small",
        //       resolve: { //making sure these are available to the modal controller
        //         extension: function () {
        //             return model.extensionToDeploy;
        //         }
        //       }
        //     });

        //     return modalInstance.result.then(function (deployedExtension) {
        //       //OK clicked on modal
        //       $scope.deployedExtension = deployedExtension;
        //     }, function () {
        //       //modal dismissed
        //       $log.info("Deploy modal dismissed at: " + new Date());
        //     });
        // };


        var init = function() {
			console.log("Initializing... getting all the extensions");
            model.getAllExtensions();
        };
        init();

    };

    angular.module("extensionConsole").controller("viewExtensionsController", ["$scope", "extensionConsoleFactory", "extensionService", "$modal", "$log", viewExtensionsController]);
}());