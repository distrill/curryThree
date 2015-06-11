var Post = require( 'mongoose' ).model( 'Post' );

exports.renderNewPost = function( req, res ) {
    res.render( 'newPost', {} );
};

exports.renderEditPost = function( req, res ) {
    res.render( 'editPost', {
        post: req.post
    });
};

exports.renderRemovePost = function( req, res ) {
    res.render( 'removePost', {
        post: req.post
    });
};

/**                  CRUD                        **/
exports.create = function( req, res, next ) {
    var newPost = new Post( req.body );
    newPost.thumbnail = req.files.postThumbnail.name;
    newPost.save( function( err ) {
        if( err ) {
            return res.status( 400 ).send( {
                message: getErrorMessage( err )
            });
        } else {
            res.redirect( '/staging' );
        }
    });
};

exports.update = function( req, res ) {
    var post = req.post;
    post.title = req.body.title;
    post.body = req.body.body;
    post.link = req.body.link;
    if( typeof req.files.postThumbnail !== 'undefined' ) {
        post.thumbnail = req.files.postThumbnail.name;
    } else {
    }
    post.save( function( err ) {
        if( err ) {
            return res.status( 400 ).send( {
                message: getErrorMessage( err )
            });
        } else {
            res.redirect( '/staging' );
        }
    })
}

exports.delete = function( req, res ) {
    var article = req.post;
    article.remove( function( err ) {
        if( err ) {
            return res.status( 400 ).send( {
                message: getErrorMessage( err )
            });
        } else {
            res.redirect( '/staging' );
        }
    })
}

exports.postByID = function( req, res, next, id ) {
    Post.findOne( {
        _id: id
    }, function( err, post ) {
        if( err ) {
            return next( err );
        } else {
            req.post = post;
            next();
        }
    });
};

function getErrorMessage( err ) {
    if( err.errors ) {
        for( var errName in err.errors ) {
            if( err.errors[ errName ].message ) return err.errors[ errName ].message;
        }
    } else {
        return 'Unknown server error :(';
    }
};
