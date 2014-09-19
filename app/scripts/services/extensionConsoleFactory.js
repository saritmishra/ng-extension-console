/* global  angular */

(function () {
    "use strict";

    var extensionConsoleFactory = function($resource, $http) {
        var factory = {};

        // factory.extensionList =  [{ "name" : "app-001", "groupID" : "G001",  "artifactID" : "A001",  "releaseID" : "R001" },
        //                                       { "name" : "app-002", "groupID" : "G002",  "artifactID" : "A002",  "releaseID" : "R002" }];
        factory.extensionList = [{ "name" : "app-001", "groupID" : "G001",  "artifactID" : "A001",  "releaseID" : "R001",
        "versions": [{"version":"v1", "instance": "login3/sdx", "profile": "prod", "configuration":"config1"},
        {"version":"v2", "instance": "login3/sx", "profile": "prod", "configuration":"config1"},
        {"version":"v3", "instance": "qa03/sdx", "profile": "qa", "configuration":"config2"}] },
        { "name" : "app-002", "groupID" : "G002",  "artifactID" : "A002",  "releaseID" : "R002", "versions": [{"version":"v1", "instance": "o2/o2", "profile": "prod", "configuration":"config1"}, {"version":"v2", "instance": "qao2/o2", "profile": "qa", "configuration":"config1"}] }];


        factory.configPropertyList = [];

        factory.addExtension = function(extension){
            factory.extensionList.push(extension);
        };

        factory.getConfigPropertyList = function(){
            return factory.configPropertyList;
        };

        factory.saveConfiguration = function(newConfig){
            // return $resource("/saveConfig" + )
            $http.post('/saveConfig/', JSON.stringify(newConfig))
                .success(function(data, status, headers, config) {
                    console.log("$http returns:" + data);
                });
        };
        // factory.getBestSellers = function(category, offset){
        //     return $resource("/getBestSellers/" + category + "/" + offset);
        // };

        // factory.getCategories = function(){
        //     return $resource("/getCategories");
        // };

        return factory;
    };

    angular.module("extensionConsole").factory("extensionConsoleFactory", ["$resource","$http", extensionConsoleFactory]);
}());