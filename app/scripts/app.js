'use strict';

/* App Module */

var phonecatApp = angular.module('extensionConsole', [
  'ngRoute',
  'ui.bootstrap',

  'mainExtensionController'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/view', {
        templateUrl: 'views/viewExtensions.html',
        controller: 'ExtListCtrl'
      }).
      when('/create', {
        templateUrl: 'views/createExtension.html',
        controller: 'ExtListCtrl'
      }).
      when('/manage', {
        templateUrl: 'views/manageExtension.html',
        controller: 'ManageExtCtrl'
      }).
      otherwise({
        redirectTo: '/view'
      });
  }]);