/* global angular */
(function () {
    "use strict";

    var createExtensionController = function ($scope, extensionConsoleFactory) {

        var extension = $scope.extension = {};
        $scope.appName = "";

        $scope.registerSubmit = function(){
            extensionConsoleFactory.registerExtension(extension)
                .success(function(data, status, headers, config){
                    console.log("Register request sent successfully");
                 });
        };

    };

    angular.module("extensionConsole").controller("createExtensionController", [ "$scope", "extensionConsoleFactory", createExtensionController]);
}());