var post = require( 'mongoose' ).model( 'Post' );

exports.render = function( req, res ) {
    post.find( {} ).find( function( err, posts ) {
        if( err ) {
            console.log( 'ERROR index.server.controller.js: ' + err );
        } else {
            console.log( posts );
            res.render( 'index', posts );
        }
    })
    // res.render( 'index', {} )
}


exports.renderStaging = function( req, res ) {
    post.find( {} ).find( function( err, postResults ) {
        if( err ) {
            console.log( 'ERROR index.server.controller.js: ' + err );
        } else {
            console.log( postResults );
            res.render( 'staging', {
                posts: postResults
            });
        }
    });
    // res.render( 'staging', {} );
}
