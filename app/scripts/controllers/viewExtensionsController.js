/* global angular */
(function () {
    "use strict";

    var viewExtensionsController = function ($scope, extensionConsoleFactory, $modal, $log, $location) {

        var model = $scope.model = {};
        $scope.hidden = false;

        model.getExtensions = function() {
            return extensionConsoleFactory.hardcodedExtensionList;
            // return extensionConsoleFactory.getExtensionList()
            //             .get(function(results) {
            //                 model.extensions = results.results;
            //             });
        };

        model.getConfigurations = function(appName, version) {
            // return extensionConsoleFactory.getConfigurations()
            //             .get(function(results) {
                        
            //             });
            return extensionConsoleFactory.hardcodedConfigurationList;
        };

        model.syncExtensions = function() {
            console.log("blah!");
            extensionConsoleFactory.syncAllExtensions();
        };

        // S E T T I N G    U P   T H E   D E P L O Y   M O D A L   W I N D O W
        $scope.openDeployModal = function () {
            var modalInstance = $modal.open({
              templateUrl: "views/deployExtensionModalView.html",
              controller: "deployExtensionModalController",
              // size: "small",
              resolve: { //making sure these are available to the modal controller
                extension: function () {
                    return model.extensionToDeploy; //
                }
              }
            });

            modalInstance.result.then(function (deployedExtension) { // how about putting a return in front
              //OK clicked on modal
              $scope.deployedExtension = deployedExtension;
            }, function () {
              //modal dismissed
              $log.info("Deploy modal dismissed at: " + new Date());
            });
        };
        // S E T T I N G    U P   T H E   D E P L O Y   M O D A L   W I N D O W

        // HELPER FUNCTIONS
        $scope.selectRow = function(row) {
            $scope.selectedRow = row;
        };

        $scope.isActive = function (viewLocation) {
            console.log("here i am");
            var active = (viewLocation === $location.path());
            return active;
        };

        var init = function() {
            // model.getExtensionDetails().$promise //this is calling model.getCategories() first, before handing over the $promise
            //     .then(function() {
            //         // model.selectedCategory = model.categories[0]; // This will update the drop-down when the page loads.
            //         // model.fetchBestSellers();
            //     },function (reason) {
            //         console.log("Sorry, failed :" + reason);
            //     });
        };

        init();
    };

    angular.module("extensionConsole").controller("viewExtensionsController", [ "$scope", "extensionConsoleFactory", "$modal", "$log", "$location", viewExtensionsController]);
}());