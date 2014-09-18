/* global  angular */

(function () {
    "use strict";

    var extensionConsoleFactory = function($resource) {
        var factory = {};

        factory.hardcodedExtensionList = [{"inserted":1395273380261,"updated":1395273380261,"extensionName":"jobs-lexus-response-pdf-export","repositoryType":"MAVEN","versions":[],"groupId":"com.medallia.apps","artifactId":"jobs-lexus-response-pdf-export","repositoryId":"releases"},
        {"inserted":1395350577969,"updated":1395350577969,"extensionName":"commons-config","repositoryType":"MAVEN","versions":[],"groupId":"com.medallia.apps","artifactId":"commons-config","repositoryId":"releases"},
        {"inserted":null,"updated":null,"extensionName":"app_name","repositoryType":null,"versions":[{"inserted":null,"updated":null,"rowVersion":1,"extension":null,"version":"1.0","document":{"inserted":null,"updated":null,"url":"http://hive.medallia.com/my_first_app"}}]}];

        factory.hardcodedConfigurationList = [{"propertyName":"prop1","propertyType":"String","nullable":true,"defaultValue":"defaultvalue"},
        {"propertyName":"prop2","propertyType":"String","nullable":false,"defaultValue":null}];

        factory.getExtensionList = function() {
            return $resource("/getAllExtensions");
        };

        factory.getConfigurationList = function () {

        };

        // POST /extension/register/{extensionName}
        factory.addExtension = function(extension){
            factory.extensionList.push(extension);
        };

        return factory;
    };

    angular.module("extensionConsole").factory("extensionConsoleFactory", ["$resource", extensionConsoleFactory]);
}());