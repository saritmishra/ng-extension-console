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
