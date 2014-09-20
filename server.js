
    // SET UP =======================
    var express = require('express');
    var request = require('request');
    var bodyParser = require('body-parser');

    var app = express();

    var appRepoApiUrl = 'http://localhost:9090/custom-apps-repository/api/extension';

    // CONFIGURATION =======================
    app.use(express.static(__dirname, '/'));
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json

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
    
    // ROUTES =======================================
    // Tutorials: http://www.sitepoint.com/making-http-requests-in-node-js/
    app.get('/getAllExtensions', function(req,res) {
        console.log("Getting all the extensions from Extension Service...");
        request({
            uri: appRepoApiUrl + '/all',
            method: "GET"
        }, function(error, response, body) {
            console.log(response.request.href  + " ===> " + response.statusCode);
            res.send(body);
        });
    });

    app.get(
    );


    // APPLICATION ================================
    app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ====
    app.listen(8080);
    console.log("Express listening on port 8080");