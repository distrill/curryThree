var Post = require( 'mongoose' ).model( 'Post' );

exports.renderNewPost = function( req, res ) {
    res.render( 'newPost', {} )
}

exports.create = function( req, res, next ) {
    var newPost = new Post( req.body );
    newPost.thumbnail = req.files.postThumbnail.name;
    newPost.save( function( err ) {
        if( err ) {
            console.log( 'ERROR: post.server.controller.create(): ' + err );
        }
        res.redirect( '/' );
    });
}
