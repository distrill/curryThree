var users = require( '../../app/controllers/users.server.controller' ),
    passport = require( 'passport' );

module.exports = function( app ) {
    app .route( '/users' )
        .get( users.renderStaging )
        .post( users.create );

    app .route( '/users/:userID' )
        .get( users.tempRead );

    app .route( '/signin' )
        .get( users.renderSignin )
        .post( passport.authenticate( 'local', {
            successRedirect: '/',
            failureRedirect: '/signin',
        }));

    app .route( '/signout' )
        .get( users.signout );

    // app .route( '/signup' )
    //     .get( users.renderSignup )
    //     .post( users.create );

    app .param( 'userID', users.userByID );
}
