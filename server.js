process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require( './config/mongoose' ),
    express = require( './config/express' ),
    morgan = require( './config/mongoose' );

var db = mongoose(),
    app = express( db );

app.listen( 3030, '127.0.0.1' );

console.log( 'temp app running at http://localhost:3030/' );
