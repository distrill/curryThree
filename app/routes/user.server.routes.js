var users = require( '../../app/controllers/users.server.controller' );

module.exports = function( app ) {
    app .route( '/users' )
        .get( users.renderStaging )
        .post( users.create );

    app .route( '/users/:userID' )
        .get( users.tempRead );

    app .param( 'userID', users.userByID );
}
