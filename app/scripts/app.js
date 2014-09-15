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
            .when("/", {
                templateUrl: "views/main.html",
                controller: "extensionConsoleController"
            })
            .otherwise({
                redirectTo: "/"
            });
    });

}());
