/* global  angular */

(function () {
    "use strict";

    var extensionConsoleFactory = function($resource) {
        var factory = {};

        factory.extensionList =  [{ "name" : "app-001", "groupID" : "G001",  "artifactID" : "A001",  "releaseID" : "R001" },
                                              { "name" : "app-002", "groupID" : "G002",  "artifactID" : "A002",  "releaseID" : "R002" }];

        factory.addExtension = function(extension){
            factory.extensionList.push(extension);
        };

        // factory.getBestSellers = function(category, offset){
        //     return $resource("/getBestSellers/" + category + "/" + offset);
        // };

        // factory.getCategories = function(){
        //     return $resource("/getCategories");
        // };

        return factory;
    };

    angular.module("extensionConsole").factory("extensionConsoleFactory", ["$resource", extensionConsoleFactory]);
}());