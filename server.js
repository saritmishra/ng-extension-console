/* global console, require, __dirname */

(function() {
    "use strict";

    var express = require("express"),
        app = express(),
        request = require("request"),
        bodyParser = require('body-parser');

    app.use(express.static(__dirname, "/"));
    app.use(bodyParser.json()); // to parse the request body that gets POSTed to Node

    //Register an extension
    app.post('/registerExtension', function(req, res) {
        console.log("begin post...");
        console.log(JSON.stringify(req.body));
        request({
            // uri: "http://requestb.in/16noz291",
            uri: "http://localhost:7070/custom-apps-repository/api/extension/",
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req.body)
        }, function(error, response, body){
            // console.log("response is:" + body);
            console.log(response.statusCode);
            console.log(body);
            res.send(body);
        });
    });

// Saving configuration for (extension-name, version, profile)
    app.post('/saveConfig/:extensionName/:version/:profile', function(req, res) {
        console.log("begin post...");
        console.log(JSON.stringify(req.body));
        request({
            // uri: "http://requestb.in/16noz291",
            uri: "http://localhost:9090/medallia-extension-manager-configuration-service/configure/" + req.params.extensionName + "/" +req.params.version + "/" + req.params.profile,
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req.body)
        }, function(error, response, body){
            // console.log("response is:" + body);
            console.log(response.statusCode);
            console.log(body);
            res.send(body);
        });
    });

    // Get all extensions
    app.get("/getAllExtensions", function(req, res) {
        console.log("Getting all registered extensions...");
        request({
            uri: "http://localhost:7070/custom-apps-repository/api/extension/all" ,
            method: "GET"
        }, function (error, response, body) {
            res.send(body);
        });
    });

   // app.get("/getCategories", function(req, res) {
   //      var categories = {};

   //      console.log("Getting available bestseller categories from NY Times...");
   //      request({
   //          uri: "http://api.nytimes.com/svc/books/v2/lists/names/?api-key=" + api_key,
   //          method: "GET"
   //      }, function (error, response, body) {
   //          categories = body;
   //          res.send(categories);
   //      });
   //  });

    // app.get("/getBestSellers/:category/:offset", function(req, res) {
    //     var bestSellers = {},
    //         paramString = "?api-key=" + api_key;

    //     console.log("Getting best-sellers for category: " + req.params.category + " with offset = " + req.params.offset);

    //     if (req.params.offset && req.params.offset !== "0")
    //         paramString =  paramString + "&offset=" + req.params.offset;

    //     request({
    //         uri: "http://api.nytimes.com/svc/books/v2/lists/" + req.params.category + paramString,
    //         method: "GET"
    //     }, function (error, response, body) {
    //         bestSellers = body;
    //         res.send(bestSellers);
    //     });
    // });

    app.listen(8080);
    console.log("Express listening on port 8080");

}());