/* global angular */
(function () {
    "use strict";

    var viewExtensionsController = function ($scope, extensionConsoleFactory) {

        var model = $scope.model = {};

            // model.bestSellers = [];
            // model.personalRatings = []; //Not very useful - Not linked to individual books and lost after page-refresh
            // model.categories = [];
            // model.totalItems = 0;
            // model.copyright = "";
            // model.rating ="2";
        $scope.hidden = false;

        model.getExtensionDetails = function(extension) {
            return extensionConsoleFactory.extensionList;
        };

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

    angular.module("extensionConsole").controller("viewExtensionsController", [ "$scope", "extensionConsoleFactory", viewExtensionsController]);
}());