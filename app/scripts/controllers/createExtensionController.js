/* global angular */
(function () {
    "use strict";

    var createExtensionController = function ($scope, extensionConsoleFactory) {

        var extension = {};

        $scope.registerSubmit = function(){

            extension["extensionName"] = $scope.extensionName;
            extension["groupId"] = $scope.groupId;
            extension["artifactId"] = $scope.artifactId;
            extension["repositoryId"] = $scope.repositoryId;
             
            extensionConsoleFactory.registerExtension(extension)
                .success(function(data, status, headers, config){
                    console.log("Register request sent successfully");
                 });
        };

    };

    angular.module("extensionConsole")
        .controller("createExtensionController",
            [ "$scope", "extensionConsoleFactory", createExtensionController]
        );
}());