/* global angular */
(function () {
    "use strict";

    var createExtensionController = function ($scope, $location, extensionConsoleFactory) {

        var model = $scope.model = {};
        model.extensionList = [];

        // Get all the extensions
        model.getAllExtensions = function() {
            extensionConsoleFactory.getExtensionList()
                        .success(function(data){
                            model.extensionList = data;
                        });
        };
		
        $scope.registerSubmit = function(){
			var extension = {};
            extension["extensionName"] = $scope.extensionName;
            extension["groupId"] = $scope.groupId;
            extension["artifactId"] = $scope.artifactId;
            extension["repositoryId"] = $scope.repositoryId;
             
            extensionConsoleFactory.registerExtension(extension)
                .success(function(data, status, headers, config){
                    console.log("Register request sent successfully");
                    
                    // Redirect to /view
                    $location.path('/view');
                    
                    // Force reload
                    // $window.location.reload();
                 });
        };
		
        var init = function() {
			console.log("Initializing... getting all the extensions");
            model.getAllExtensions();
        };
        init();
    };

    angular.module("extensionConsole")
        .controller("createExtensionController",
            [ "$scope", "$location", "extensionConsoleFactory", createExtensionController]
        );
}());