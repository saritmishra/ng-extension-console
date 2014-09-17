/* global angular */
(function () {
    "use strict";

    var createExtensionController = function ($scope, extensionConsoleFactory) {

        var extension = $scope.extension = {};

        $scope.createSubmit = function(){
            extensionConsoleFactory.addExtension(extension);
        };

    };

    angular.module("extensionConsole").controller("createExtensionController", [ "$scope", "extensionConsoleFactory", createExtensionController]);
}());