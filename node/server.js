

var http    = require("http");
var express = require('express');
var communications = express()


// Exogenous control variables
var server_port = 1776

// Instantiate the server
http.createServer(function (request, response) {
    
}).listen(server_port);

communications.get('/', function(request, response) {
    console.log(__dirname);
    response.sendFile(__dirname + '/index.html');
});

communications.get('/index.html', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

console.log('Http running on port 1776');


