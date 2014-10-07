/* global angular */

(function () {

"use strict";

angular
    .module("extensionConsole", [
        "ngResource",
        "ngRoute",
        "ui.bootstrap"
    ])
    .config( function ( $routeProvider ) {

        $routeProvider
            .when("/view", {
                templateUrl: "views/viewExtensions.html",
                controller: "viewExtensionsController"
            })
			.when("/viewExecution", {
				templateUrl: "views/viewExecutionInfo.html",
				controller: "viewExecutionsCtrl"
			})
            .when("/showLogDetails/:appName/:executionId", {
                templateUrl: "views/viewLogDetails.html",
				controller: "viewExecutionsDetailsCtrl"
            })
            .when("/register", {
                templateUrl: "views/createExtension.html",
                controller: "createExtensionController"
            })
            .when("/manage", {
                templateUrl: "views/manageExtension.html"
            })
            .otherwise({
                redirectTo: "/view"
            });
    });

}());
