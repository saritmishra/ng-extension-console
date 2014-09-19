/* global angular */
(function () {
    "use strict";

    var viewExtensionsController = function ($scope, extensionConsoleFactory, $modal, $log) {

        var model = $scope.model = {};
        $scope.hidden = false;
        model.configPropertyList = {};
        model.updatedConfigPropertyList = {};

        model.getExtensionDetails = function(extension) {
            return extensionConsoleFactory.extensionList;
        };

        var trial = function() {
            var testData = {
                  username: 'sarit',
                  firstName: 'sarit',
                  lastName: 'mishra'
            };
            extensionConsoleFactory.saveConfiguration(testData);
        }; trial();

        // S E T T I N G    U P   T H E   D E P L O Y   M O D A L   W I N D O W
        $scope.openDeployModal = function () {
            var modalInstance = $modal.open({
              templateUrl: "views/deployExtensionModalView.html",
              controller: "deployExtensionModalController",
              // size: "small",
              resolve: { //making sure these are available to the modal controller
                extension: function () {
                    return model.extensionToDeploy;
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
        }; // S E T T I N G    U P   T H E   D E P L O Y   M O D A L   W I N D O W


        // S E T T I N G   U P   C O N F I G   E N T R Y   M O D A L   W I N D O W
        $scope.openConfigEntryModal = function () {
            var modalInstance = $modal.open({
              templateUrl: "views/configEntryView.html",
              controller: "configEntryModalController",
              resolve: { //making sure these are available to the modal controller
                propertyList: function () {
                    return extensionConsoleFactory.getConfigPropertyList()
                                .success(function(data, status, headers, config){
                                    model.configPropertyList = data;
                                    return data;
                                });
                }
              }
            });

            modalInstance.result.then(function (updatedConfigPropertyList) { // how about putting a return in front
              //OK clicked on modal
              model.updatedConfigPropertyList = updatedConfigPropertyList;
            }, function () {
              //modal dismissed
              $log.info("configEntry modal dismissed at: " + new Date());
            });
        };

        //
        // model.getCategories = function() {
        //     return bestSellerFactory.getCategories()
        //                 .get(function(results) {
        //                     model.categories = results.results;
        //                 });
        // };

        // model.getDetail = function (book, detail) {
        //     return book.book_details[0][detail];
        // };

        // model.fetchBestSellers = function() {
        //     model.currentPage = 1;
        //     model.getDataFor(model.selectedCategory.list_name, model.currentPage);
        // };

        // model.fetchBestSellersNextPage = function() {
        //     model.getDataFor(model.selectedCategory.list_name, model.currentPage);
        // };

        // model.getDataFor = function (category, offset) {
        //     if (!category)
        //         return;
        //     model.personalRatings = [];
        //     category = category.split(" ").join("-");

        //     offset = (offset) ? (offset - 1) * 20 : 1;

        //     bestSellerFactory.getBestSellers(category, offset)
        //        .get(function (results) {
        //            model.bestSellers = results.results;
        //            model.copyright = results.copyright;
        //            model.totalItems = results.num_results;
        //        });
        // };

        // var init = function() {
        //     model.getCategories().$promise //this is calling model.getCategories() first, before handing over the $promise
        //         .then(function() {
        //             model.selectedCategory = model.categories[0]; // This will update the drop-down when the page loads.
        //             model.fetchBestSellers();
        //         // },function (reason) {
        //         //     console.log("Sorry, failed :" + reason);
        //         });
        // };
        // init();

    };

    angular.module("extensionConsole").controller("viewExtensionsController", [ "$scope", "extensionConsoleFactory", "$modal", "$log", viewExtensionsController]);
}());