var post = require( '../controllers/post.server.controller' );

module.exports = function( app ) {

    app .route( '/newPost' )
        .get( post.renderNewPost )
        .post( post.create );

    app .route( '/post/:postID' )
        .get( post.renderEditPost )
        .post( post.update );

    app .route( '/post/remove/:postID' )
        .get( post.renderRemovePost )
        .post( post.delete );

    app .param( 'postID', post.postByID );
}
