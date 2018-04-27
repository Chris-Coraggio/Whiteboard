

// Dependency instantiations
var files   = require('fs');
var http    = require("http");
var path    = require('path');
var maria   = require('mariasql');
var express = require('express');
var communications = express();


// Exogenous control variables
var server_port = 1776;
var canvas_tree = path.join(__dirname, '..', 'canvas_data');
var html_tree   = path.join(__dirname, '..', 'public');
var log_tree    = path.join(__dirname, '..', 'logs');

console.log('canvass root directory:\t' + canvas_tree);
console.log('html root directory:\t'    + html_tree  );
console.log('log root directory:\t'     + log_tree   );


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
    profiler.query(check_string, function(err, rows) {
        callback(rows.info.numRows > 0);
    });
}

function check_password(username, password, callback) {
    // Checks the database for an entry with a matching username and password
    // Returns whether the username and password match is found

    var check_string = 'SELECT 1 FROM humanity WHERE username = \''
        + username + '\' AND password = \'' + password + '\';'; 
    
    profiler.query(check_string, function(err, rows) {
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
        
        return;
    });
}

function login(username, password, res) {
    // Logs the user in, providing a cookie
    
    console.log('Login request:');
    
    user_exists(username, function(user_in_database) {

        if (!user_in_database) {
            console.log('\tUser not registered');
            return;  // Could call error handling function instead
        }
        
        // User is definitely new, check their login password before adding

        return check_password(username, password, function(password_correct) {

            if (!password_correct) {
                console.log('password was incorrect');
                return; // Could call error handling function instead
            }
            
            // User has provided correct login credentials
            // Get and emit the cookie
            
            var check_string = 'SELECT * FROM humanity WHERE username = \'' + username + '\';';
            profiler.query(check_string, function(err, rows) {
                console.log('cookie: ' + rows[0].cookie);
                //res.send('hello world!')
                res.send({'cookie': rows[0].cookie})
            });
        });
    });
}

function append_history(cookie, data) {
    // Appends new information to the user's history

    var search_string = 'SELECT * FROM humanity WHERE cookie = \'' + cookie + '\';';
    profiler.query(search_string, function(err, rows) {

        if (rows.info.numRows == 0) {
            console.log('tried to write history to user who does not exist');
            return;
        }
            
        var history_file = path.join(log_tree, rows[0].history);
        files.appendFile(history_file, data, function(err) {});
    });
}

function retrieve_history(cookie) {
    // Retrieves the user's history

    var search_string = 'SELECT * FROM humanity WHERE cookie = \'' + cookie + '\';';
    profiler.query(search_string, function(err, rows) {

        if (rows.info.numRows == 0) {
            console.log('tried to retrieve history from user who does not exist');
            return;
        }
            
        var history_file = path.join(log_tree, rows[0].history);
        
    });
}

/*register('Noah' , 'password');

register('Zoe'  , 'wordpass');
register('Chris', 'pawordss');

login('Zoe' , 'password');*/
//login('Noah', 'password');

//append_history('1ia3gjv91eu2szsvuu4ld0xjugbjt0xm', 'Edit 1\nEdit 2\n');



function create_canvas(title, id) {
    // Creates a new canvas
    
    var check_string = 'SELECT 1 FROM canvases WHERE id = \'' + id + '\';';
    profiler.query(check_string, function(err, rows) {
        
        if (rows.info.numRows > 0) {
            console.log('Tried to make canvas that already exists');
            //update the canvas if one with the same id already exists
            var creation_string;
            creation_string = 'UPDATE canvases SET title=' 
                + title + " WHERE id=" + id + ";";
            profiler.query(creation_string, function(err, rows) {
                
            })
            return;   // Canvas already exists
        }
        
        // Canvas does not exist, create it now
        var creation_string;
        creation_string  = 'INSERT INTO canvases VALUES (\''
            + id +  '\', \''
            + title +          '\', \''
            + title + '.txt' + '\');';
        
        profiler.query(creation_string, function(err, rows) {
            // Could be used to emit the canvas id
        });
    });
}

function write_canvas_plot(id, data) {
    // Destructively writes data to the canvas file
    
    var search_string = 'SELECT * FROM canvases WHERE id = \'' + id + '\';';
    profiler.query(search_string, function(err, rows) {

        if (rows.info.numRows == 0) {
            console.log('Tried to write to canvas that does not exist');
            return;
        }
        
        var canvas_file = path.join(canvas_tree, rows[0].plots);
        files.writeFile(canvas_file, data, function(err) {});
    });
}

function read_canvas_plot(id) {
    // emits the canvas file

    var search_string = 'SELECT * FROM canvases WHERE id = \'' + id + '\';';
    profiler.query(search_string, function(err, rows) {

        console.log(rows);
        if (rows.info.numRows == 0) {
            console.log('Tried to read canvas that does not exist');
            return;
        }

        var canvas_file = path.join(canvas_tree, rows[0].plots);
        
    });
}

function read_all_canvas_ids() {
    // emits all of the canvas ids

    var query_string = 'SELECT * FROM canvases;';
    profiler.query(query_string, function(err, rows) {

        if (rows.info.numRows == 0) {
            console.log('No canvases are in the database');
            return;
        }

        console.log(rows);

    });
}

create_canvas('Test Canvas', '1rox1cwn0ysdczltrj4qkc97ztq28k7y');
create_canvas('Best Canvas', 'ogy2f2pficctwsuu19g12sklqzl5vpx0');

write_canvas_plot('1rox1cwn0ysdczltrj4qkc97ztq28k7y', 'Test data, which would be exogenous\n');

read_all_canvas_ids();

// Routes with side effects possible
communications.get('/', function(request, response) {
    console.log(html_tree + '/index.html');
    response.sendFile(html_tree + '/index.html');
});

communications.get('/alive.html', function(request, response) {
    response.sendFile(html_tree + '/alive.html');
});

communications.get('/api/humanity', (req, res) => {
    const url = req.url
    const user = url.substring(url.indexOf("user=") + 5, url.indexOf("&pass"))
    const pass = url.substring(url.indexOf("pass=") + 5)
    //console.log('fetching ' + user + ":" + pass)
    login(user, pass, res)
});

communications.get('/api/canvases', (req, res) => {
    const url = req.url
    const title = url.substring(url.indexOf("title=") + 6)
    create_canvas(title)
});


// Instantiate the server
var server = communications.listen(server_port, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Http running on port 1776');
});


// Cleanup?
profiler.end();
