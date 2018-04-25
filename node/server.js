

// Dependency instantiations
var http    = require("http");
var path    = require('path');
var maria   = require('mariasql');
var express = require('express');
var communications = express()

// MariaDB profiler
var profiler = new maria({
    db       : 'profiles',
    host     : 'localhost',
    user     : 'profiler',
    password : ''
});

console.log('MariaDB manager established\n');

profiler.query('USE profiles;', function(err, rows) {});

function register(username, password) {

    var registration_string;
    registration_string  = 'INSERT INTO humanity VALUES (\'';
    registration_string += username + '\', \'';
    registration_string += password + '\', \'';
    registration_string += username + '.txt\');';

    console.log('Registration request:');
    console.log('\t' + registration_string);
    
    profiler.query(registration_string, function(err, rows) {});
}

register('Zoe', 'wordpass');



profiler.end();
    

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

