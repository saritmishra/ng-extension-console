/* global angular */
(function () {
    "use strict";

    var configEntryModalController = function ($scope,  $modalInstance, propertyList) {

        $scope.propertyList = propertyList;

        $scope.ok = function () {
          $modalInstance.close($scope.propertyList);
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };

    };

    angular.module("extensionConsole").controller("configEntryModalController", [ "$scope", "$modalInstance", "propertyList", configEntryModalController]);
}());