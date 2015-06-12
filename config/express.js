var config = require( './config' ),
    configMulter = require( '../config/multer.js' ),
    express = require( 'express' ),
    // methodOverride = require( 'method-override' ),
    morgan = require( 'morgan' ),
    multer = require( 'multer' ),
    passport = require( 'passport' ),
    session = require( 'express-session' );

module.exports = function( db ) {
    var app = express();

    app.use( morgan( 'dev' ) );

    app.use( multer( configMulter.settings ));
    // app.use( methodOverride( 'X-HTTP-Method-Override' ) );

    app.use( session( {
        saveUninitiallized: true,
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
