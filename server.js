/* global console, require, __dirname */

(function() {
    "use strict";

    var express = require("express"),
        app = express(),
        request = require("request"),
        host = "http://localhost:8080";

    app.use(express.static(__dirname, "/"));

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

    app.get("/getAllExtensions", function(req,res) {
        var extensions = {};
        
        console.log("Getting all the extensions from Extension Service...");
        request({
            uri: "/custom-apps-repository/api/extension/all",
            method: "GET"
        }, function (error, response, body) {
            extensions = body;
            res.send(extensions);
        });
    });

    app.listen(9000);

    console.log("Express listening on port 9000");
}());