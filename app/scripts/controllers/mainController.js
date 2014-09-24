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

    var manageExtCtrl = function ManageExtCtrl($scope, $window, $http, $log) {
        $scope.syncExtensions = function() {
            $http.get('/syncExtensions').success(function(statusCode){
                if (statusCode == 'OK') {
                    $log.info("Successfully synced with Nexus service manually!");
                } else {
                    $log.info("Failed to sync with Nexus service manually..." + statusCode);
                }
                $window.location.reload();
            })
            .error(function(statusCode){
                $log.info('Error: ' + statusCode);
            });
        };
    };

    angular.module("extensionConsole").controller('manageExtCtrl', ['$scope', '$window', '$http', '$log', manageExtCtrl]);
}());