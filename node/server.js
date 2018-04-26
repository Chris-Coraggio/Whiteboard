

// Dependency instantiations
var files   = require('fs');
var http    = require("http");
var path    = require('path');
var maria   = require('mariasql');
var express = require('express');
var communications = express()


// Exogenous control variables
var server_port = 1776;
var html_tree = path.join(__dirname, '..', 'public')
var log_tree = path.join(__dirname, '..', 'logs');

console.log('html root directory');
console.log('\t' + html_tree);


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

function check_password(username, password, callback) {
    // Checks the database for an entry with a matching username and password
    // Returns whether the username and password match is found

    var check_string = 'SELECT 1 FROM humanity WHERE username = \''
        + username + '\' AND password = \'' + password + '\';'; 
    
    var result = profiler.query(check_string, function(err, rows) {
        callback(rows.info.numRows > 0);
    });
}

function make_cookie() {
    // Generates and returns a 32 alphanumeric cookie
    
    var cookie = '';
    var alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 32; i++) {
        cookie += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    
    return cookie;
}

function register(username, password) {
    // Adds the user to the database
    // First part in process, see callback routine

    console.log('Registration request:');
    
    user_exists(username, function(user_already_present) {

        if (user_already_present) {
            console.log('\tUser already registered');
            return;  // Could call error handling function instead
        }
        
        // User is definitely new, add them now to the database
        
        var registration_string;
        registration_string  = 'INSERT INTO humanity VALUES (\''
            + username +           '\', \''
            + password +           '\', \''
            + username +  '.txt' + '\', \''
            + make_cookie()      + '\');';

        console.log('\t' + registration_string + '\t');
        
        profiler.query(registration_string, function(err, rows) {});

        var history_file = path.join(log_tree, username + '.txt');
        files.writeFile(history_file, "", function(err) {});
        
        return true;
    });
}

function login(username, password) {
    // Logs the user in, providing a cookie
    
    console.log('Login request:');
    
    user_exists(username, function(user_in_database) {

        if (!user_in_database) {
            console.log('\tUser not registered');
            return;  // Could call error handling function instead
        }
        
        // User is definitely new, check their login password before adding

        check_password(username, password, function(password_correct) {

            if (!password_correct) {
                console.log('password was incorrect');
                return false; // Could call error handling function instead
            }
            
            // User has provided correct login credentials
            // Get and emit the cookie
            
            var check_string = 'SELECT * FROM humanity WHERE username = \'' + username + '\';';
            var result = profiler.query(check_string, function(err, rows) {
                console.log('cookie: ' + rows[0].cookie);
            });
        });
    });
}

function append_history(cookie, data) {
    // Appends new information to the user's history

    var check_string = 'SELECT * FROM humanity WHERE cookie = \'' + cookie + '\';';
    profiler.query(check_string, function(err, rows) {

        console.log(rows);
        if (rows.info.numRows == 0) return false;

        var history_file = path.join(log_tree, rows[0].history);
        files.appendFile(history_file, data, function(err) {});
    });
}


//register('Noah' , 'password');

/*register('Zoe'  , 'wordpass');
register('Chris', 'pawordss');

login('Zoe' , 'password');*/
//login('Noah', 'password');

append_history('1ia3gjv91eu2szsvuu4ld0xjugbjt0xm', 'Edit 1\nEdit 2\n');

profiler.end();


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
});

