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
            .otherwise({
                redirectTo: "/view"
            });
    });

}());
