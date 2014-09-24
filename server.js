/* global console, require, __dirname */

(function() {
    "use strict";

    var express = require("express"),
        app = express(),
        request = require("request"),
        bodyParser = require('body-parser');

    var appRepoApiBaseUrl = 'http://localhost:7070/custom-apps-repository/api/extension';
    var configServiceApiBaseUrl = 'http://localhost:9090/medallia-extension-manager-configuration-service/configure';

    // CONFIGURATION ==============================================================================

    app.use(express.static(__dirname, "/"));
    app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()); // to parse the request body that gets POSTed to Node

    // ROUTES ===================================================================

    // Register an extension
    app.post('/registerExtension', function(req, res) {
        console.log("Register an extension...");
        console.log("begin post...");
        console.log(JSON.stringify(req.body));
        request({
            // uri: "http://requestb.in/16noz291",
            uri: appRepoApiBaseUrl + "/register",
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req.body)
        }, function(error, response, body){
            if (!error) {
                console.log(response.request.href  + " ===> " + response.statusCode);
                console.log(body);
            } else {
                console.log(error);
            }
            res.send(body);
        });
    });

    // Saving configuration for (extension-name, version, profile)
    app.post('/saveConfig/:extensionName/:version/:profile', function(req, res) {
        var extensionName = req.params.extensionName;
        var version = req.params.version;
        var profile = req.params.profile;

        console.log("Saving configuration for (" + extensionName + ", " + version + ", " + profile + ")");
        console.log("begin post...");
        console.log(JSON.stringify(req.body));
        request({
            // uri: "http://requestb.in/16noz291",
            uri: configServiceApiBaseUrl + "/" + extensionName + "/" + version + "/" + profile,
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req.body)
        }, function(error, response, body){
            if (!error) {
                console.log(response.request.href  + " ===> " + response.statusCode);
                console.log(body);
            } else {
                console.log(error);
            }
            res.send(body);
        });
    });

    app.get('/getConfig/:extensionName/:version/:profile', function(req, res) {
        var extensionName = req.params.extensionName;
        var version = req.params.version;
        var profile = req.params.profile;

        console.log("Getting configuration for (" + extensionName + ", " + version + ", " + profile + ")");
        console.log("begin get...");
        request({
            // uri: "http://requestb.in/16noz291",
            uri: configServiceApiBaseUrl + "/" + extensionName + "/" + version + "/" + profile,
            method: "GET",
        }, function(error, response, body){
            if (!error) {
                console.log(response.request.href  + " ===> " + response.statusCode);
                console.log(body);
            } else {
                console.log(error);
            }
            res.send(body);
        });
    });
    
    // Get all the extensions
    app.get("/getAllExtensions", function(req, res) {
        console.log("Getting all the registered extensions...");
        var extensions = {};
        request({
            uri: appRepoApiBaseUrl + "/all" ,
            method: "GET"
        }, function (error, response, body) {
            if (!error) {
                console.log(response.request.href  + " ===> " + response.statusCode);
                extensions = body;
            } else {
                console.log(error);
            }
            res.send(extensions);
        });
    });

    // Get list of config properties 
    app.get("/getConfigProperties/:extensionName/:versionId", function(req, res) {
        var extensionName = req.params.extensionName;
        var versionId = req.params.versionId;
        
        console.log("Getting config properties for " + extensionName + " (" + versionId + ")");
        var properties = {};
        request({
            uri: appRepoApiBaseUrl + '/' + extensionName + "/" + versionId + "/configuration",
            method: "GET"
        }, function(error, response, body) {
            if (!error) {
                console.log(response.request.href  + " ===> " + response.statusCode);
                properties = body;
            } else {
                console.log(error);
            }
            res.send(properties);
        });

    });

    // Sync all the extensions in app repo with Nexus service
    app.get('/syncExtensions', function(req,res) {
        console.log("Manually sync with Nexus to update all the extensions...");
        var result = '';
        request({
            uri: appRepoApiBaseUrl + '/sync',
            method: "GET"
        }, function(error, response, body) {
            if (!error) {
                var resultCode = response.statusCode;
                console.log(response.request.href  + " ===> " + resultCode);
                result = resultCode;
            } else {
                console.log(error);
            }
            res.send(result);
        });
    });

    app.listen(8080);
    console.log("Express listening on port 8080");

}());