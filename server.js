var express = require( 'express' ),
    morgan = require( 'morgan' );

var app = express();

app.use( morgan( 'dev' ) );

app.set( 'views', './app/views' );
app.set( 'view engine', 'ejs' );
app.use( express.static( './public' ));

require( './app/routes/index.server.routes.js' )( app );

app.listen( 3030, '127.0.0.1' );

console.log( 'temp app running at http://localhost:3030/' );
