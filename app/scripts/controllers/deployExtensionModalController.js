/* global angular */
(function () {
    "use strict";

    var deployExtensionModalController = function ($scope,  $modalInstance, extension) {

        $scope.extension = extension;

        $scope.ok = function () {
          $modalInstance.close($scope.extension);
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };

    };

    angular.module("extensionConsole").controller("deployExtensionModalController", [ "$scope", "$modalInstance", "extension", deployExtensionModalController]);
}());