/* global angular */
(function () {
    "use strict";

    /** Help:
    http://stackoverflow.com/questions/13088153/how-to-http-synchronous-call-with-angularjs
    https://groups.google.com/forum/#!topic/angular/qagzXXhS_VI/discussion
    http://stackoverflow.com/questions/21239266/angularjs-using-q-to-fire-ajax-calls-synchronously
    **/

    var viewExtensionsController = function ($scope, extensionConsoleFactory, $modal, $log) {

        var model = $scope.model = {};
        $scope.show = false;
        model.extensionList = [];
        model.configPropertyList = [];

        // Get all the extensions
        model.getAllExtensions = function() {
            extensionConsoleFactory.getExtensionList()
                        .success(function(data){
                            model.extensionList = data;
                        });
        };

        // var trial = function() {
        //     var testData = [
        //                              { "name": "Prop1", "value" : "Some Value" },
        //                              { "name": "Prop2", "value" : "Some Other" },
        //                              { "name": "Prop4", "value" : "New Value 2" },
        //                              { "name": "Prop5", "value" : "New Value 2" }
        //                             ];

        //     extensionConsoleFactory.saveConfiguration(testData);
        // }; trial();

        $scope.displayDetails = function(rowIndex, extension) {
            // Used to highlight the selected row
            $scope.selectedRow = rowIndex;
            // Used in "details"
            $scope.show = true;
            $scope.clickedExtension = extension;
        };

        $scope.closeDetails = function() {
            $scope.show = false;
            $scope.selectedRow=undefined;
        };

        // S E T T I N G   U P   C O N F I G   E N T R Y   M O D A L   W I N D O W
        $scope.openConfigEntryModal = function (extensionName, versionId) {
            // Need to make sure to get list of config properties before doing anything
            extensionConsoleFactory.getConfigPropertyList(extensionName, versionId)
                .then(function(response) {
                    model.configPropertyList = response.data;

                    var modalInstance = $modal.open({
                      templateUrl: "views/configEntryView.html",
                      controller: "configEntryModalController",
                      resolve: { //making sure these are available to the modal controller
                        extensionName: function() {
                            return extensionName;
                        },
                        propertyList: function() {
                            return model.configPropertyList;
                        }
                      }
                    });

                    return modalInstance.result.then(function (updatedConfigPropertyList) {
                      //OK clicked on modal
                      extensionConsoleFactory.saveConfiguration(updatedConfigPropertyList, extensionName);
                    }, function () {
                      //modal dismissed
                      $log.info("configEntry modal dismissed at: " + new Date());
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
            model.getAllExtensions();
        };
        init();

    };

    angular.module("extensionConsole").controller("viewExtensionsController", [ "$scope", "extensionConsoleFactory", "$modal", "$log", viewExtensionsController]);
}());