

// Dependency instantiations
var http    = require("http");
var express = require('express');
var communications = express()


// Exogenous control variables
var server_port = 1776


// Routes with side effects possible
communications.get('/', function(request, response) {
    console.log(__dirname);
    response.sendFile(__dirname + '/index.html');
});

communications.get('/index.html', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});


// Instantiate the server
var server = communications.listen(server_port, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Http running on port 1776');
})



