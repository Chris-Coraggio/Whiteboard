

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

function user_exists(username, callback) {
    // Checks the database for an entry matching the username
    // Returns whether the user is in the database
    
    var check_string = 'SELECT 1 FROM humanity WHERE username = \'' + username + '\';';
    var result = profiler.query(check_string, function(err, rows) {
        callback(rows.info.numRows > 0);
    });
}

function register(username, password) {
    // Adds the user to the database
    // Returns the success status

    user_exists(username, function(
    
    console.log('USER: ' + user_exists(username));
    return;
    if (user_exists(username)) {
        // Ensure the user hasn't already been registered
        console.log('User already registered');
        return false;
    }
    
    var registration_string;
    registration_string  = 'INSERT INTO humanity VALUES (\'';
    registration_string += username + '\', \'';
    registration_string += password + '\', \'';
    registration_string += username + '.txt\');';

    console.log('Registration request:');
    console.log('\t' + registration_string + '\t');
    
    profiler.query(registration_string, function(err, rows) {});

    return true;
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

