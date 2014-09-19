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
            .when("/create", {
                templateUrl: "views/createExtension.html",
                controller: "createExtensionController"
            })
            .when("/details/?(?:appID)?", {
                // Check how to do ID thing - until then, regex matching there for testing
                // http://blog.hfarazm.com/angularjs-routeparams/
                templateUrl: "views/viewExtensionDetails.html",
                controller: "viewExtensionsController"
            })
            .when("/manage", {
                templateUrl: "views/manageExtension.html",
                controller: "viewExtensionsController"
            })
            .otherwise({
                redirectTo: "/view"
            });
    });
}());
