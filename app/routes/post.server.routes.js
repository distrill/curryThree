var post = require( '../controllers/post.server.controller' );

module.exports = function( app ) {

    app .route( '/post' )
        .get( post.renderNewPost )
        .post( post.create );
}
