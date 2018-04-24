

// Dependency instantiations
var http    = require("http");
var path    = require('path');
var maria   = require('mariasql');
var express = require('express');
var communications = express()

// MariaDB setup will go here


// Exogenous control variables
var server_port = 1776;
var html_tree = path.join(__dirname, '..', 'public')

console.log('html root directory');
console.log('\t' + html_tree);


// Routes with side effects possible
communications.get('/', function(request, response) {
    console.log(html_tree + '/index.html');
    response.sendFile(html_tree + '/index.html');
});

communications.get('/alive.html', function(request, response) {
    response.sendFile(html_tree + '/alive.html');
});


// Instantiate the server
var server = communications.listen(server_port, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Http running on port 1776');
})

