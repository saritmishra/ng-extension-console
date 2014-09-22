/* global angular */
(function () {
    "use strict";

    var configEntryModalController = function ($scope,  $modalInstance, propertyList) {

        $scope.propertyList = propertyList;


        $scope.ok = function () {
           //copy out name, value and create new array of objects
           var updatedList =  $scope.propertyList;
           var newArray = [];
           for (var i = updatedList.length - 1; i >= 0; i--) {
                var newObj = {};
                newObj.name = updatedList[i].propertyName;
                newObj.value = updatedList[i].value;
                newArray.push(newObj);
            }

          $modalInstance.close(newArray);
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };

    };

    angular.module("extensionConsole")
      .controller("configEntryModalController",
        [ "$scope", "$modalInstance", "propertyList", configEntryModalController]
      );
}());