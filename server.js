process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require( './config/mongoose' ),
    express = require( './config/express' ),
    passport = require( './config/passport' );

var db = mongoose();
var app = express( db );
var passport = passport();

app.listen( 3030, '127.0.0.1' );

// module.exports = app;

console.log( 'temp app running at http://localhost:3030/' );
