var config = require( './config' ),
    configMulter = require( '../config/multer.js' ),
    express = require( 'express' ),
    methodOverride = require( 'method-override' ),
    morgan = require( 'morgan' ),
    multer = require( 'multer' );

module.exports = function( db ) {
    var app = express();

    app.use( morgan( 'dev' ) );

    app.use( multer( configMulter.settings ));
    app.use( methodOverride( 'X-HTTP-Method-Override' ) );

    app.set( 'views', './app/views' );
    app.set( 'view engine', 'ejs' );
    app.use( express.static( './public' ));

    require( '../app/routes/index.server.routes.js' )( app );
    require( '../app/routes/post.server.routes.js' )( app );

    return app;
}
