/* global angular */
(function () {
    "use strict";

    var createExtensionController = function ($scope, $location, extensionConsoleFactory) {

        var extension = $scope.extension = {};
        $scope.location = $location;

        $scope.createSubmit = function(){
            extensionConsoleFactory.addExtension(extension);
        };

        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };

    };

    angular.module("extensionConsole").controller("createExtensionController", [ "$scope", "$location", "extensionConsoleFactory", createExtensionController]);
}());