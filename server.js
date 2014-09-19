/* global console, require, __dirname */

(function() {
    "use strict";

    var express = require("express"),
        app = express(),
        request = require("request"),
        bodyParser = require('body-parser');

    app.use(express.static(__dirname, "/"));
    app.use(bodyParser.json()); // to parse the request body that gets POSTed to Node

    app.post('/saveConfig', function(req, res) {
        request({
            uri: "http://requestb.in/16noz291",
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req.body)
        }, function(error, response, body){
            // console.log("response is:" + body);
            // console.log(response.statusCode);
            res.send(body);
        });

    });

   // app.get("/getCategories", function(req, res) {
    //     var categories = {};

    //     console.log("Getting available bestseller categories from NY Times...");
    //     request({
    //         uri: "http://api.nytimes.com/svc/books/v2/lists/names/?api-key=" + api_key,
    //         method: "GET"
    //     }, function (error, response, body) {
    //         categories = body;
    //         res.send(categories);
    //     });
    // });

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