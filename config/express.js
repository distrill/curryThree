var bodyParser = require( 'body-parser' ),
    config = require( './config' ),
    configMulter = require( '../config/multer.js' ),
    express = require( 'express' ),
    morgan = require( 'morgan' ),
    multer = require( 'multer' ),
    passport = require( 'passport' ),
    session = require( 'express-session' );

module.exports = function( db ) {
    var app = express();

    app.use( morgan( 'dev' ) );

    app.use( bodyParser.urlencoded( {
        extended: true
    }));
    app.use( bodyParser.json() );
    app.use( multer( configMulter.settings ));
    // app.use( methodOverride( 'X-HTTP-Method-Override' ) );

    app.use( session( {
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set( 'views', './app/views' );
    app.set( 'view engine', 'ejs' );

    app.use( passport.initialize() );
    app.use( passport.session() );

    require( '../app/routes/index.server.routes.js' )( app );
    require( '../app/routes/post.server.routes.js' )( app );
    require( '../app/routes/user.server.routes.js' )( app );

    app.use( express.static( './public' ));


    return app;
}
