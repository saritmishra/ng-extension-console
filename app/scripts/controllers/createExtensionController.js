/* global angular */
(function () {
    "use strict";

    var createExtensionController = function ($scope, $location, extensionConsoleFactory) {

        var extension = {};

        $scope.registerSubmit = function(){

            extension["extensionName"] = $scope.extensionName;
            extension["groupId"] = $scope.groupId;
            extension["artifactId"] = $scope.artifactId;
            extension["repositoryId"] = "releases";
             
            extensionConsoleFactory.registerExtension(extension)
                .success(function(data, status, headers, config){
                    console.log("Register request sent successfully");
                    
                    // Redirect to /view
                    $location.path('/view');
                    
                    // Force reload
                    // $window.location.reload();
                 });
        };

    };

    angular.module("extensionConsole")
        .controller("createExtensionController",
            [ "$scope", "$location", "extensionConsoleFactory", createExtensionController]
        );
}());