/* global  angular */

(function () {
    "use strict";

    var extensionConsoleFactory = function($resource) {
        var factory = {};

        factory.getBestSellers = function(category, offset){
            return $resource("/getBestSellers/" + category + "/" + offset);
        };

        factory.getCategories = function(){
            return $resource("/getCategories");
        };

        return factory;
    };

    angular.module("extensionConsole").factory("extensionConsoleFactory", ["$resource", extensionConsoleFactory]);
}());