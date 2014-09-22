/* global angular */
(function () {
    "use strict";

    var baseCtrl = function ($scope, $location, extensionConsoleFactory) {
        $scope.isDropdownMenuItem = function() {
            var dropdownMap = {'/register' : 'Register Extension', '/manage' : 'Manage Extension'};
            var currentPath = $location.path();

            if (currentPath != '/view') {
                $scope.selectedItem = dropdownMap[currentPath];
                return true;
            } else {
                $scope.selectedItem = "Admin Tools";
                return false;
            }
        };

        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
    };

    angular.module("extensionConsole").controller("baseCtrl", [ "$scope", "$location", "extensionConsoleFactory", baseCtrl]);

    var manageExtCtrl = function ManageExtCtrl($scope, $http) {
        $scope.syncExtensions = function() {
            $http.get('/syncExtensions').success(function(statusCode){
                if (statusCode == '200') {
                    console.log("Successfully synced with Nexus service manually!");
                } else {
                    console.log("Failed to sync with Nexus service manually..." + statusCode);
                }
            })
            .error(function(statusCode){
                console.log('Error: ' + statusCode);
            });
        };
    };

    angular.module("extensionConsole").controller('manageExtCtrl', ['$scope', '$http', manageExtCtrl]);
}());