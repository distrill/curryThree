var Post = require( 'mongoose' ).model( 'Post' ),
    fs = require( 'fs' );

exports.renderNewPost = function( req, res ) {
    if( req.session.passport.user ) {
        console.log( req.session );
        res.render( 'newPost', {
            admin: true
        });
    } else {
        res.redirect( '/signin' );
    }
};

exports.renderEditPost = function( req, res ) {
    if( req.session.passport.user ) {
        res.render( 'editPost', {
            post: req.post,
            admin: true
        });
    } else {
        res.redirect( '/' );
    }
};

exports.renderRemovePost = function( req, res ) {
    if( req.session.passport.user ) {
        res.render( 'removePost', {
            post: req.post,
            admin: true
        });
    } else {
        res.redirect( '/' );
    }
};

/**                  CRUD                        **/
exports.create = function( req, res, next ) {
    if( req.session.passport.user ) {
        var newPost = new Post( req.body );
        newPost.thumbnail = req.files.postThumbnail.name;
        newPost.save( function( err ) {
            if( err ) {
                return res.status( 400 ).send( {
                    message: getErrorMessage( err )
                });
            } else {
                res.redirect( '/' );
            }
        });
    } else {
        res.redirect( '/' );
    }
};

exports.update = function( req, res ) {
    if( req.session.passport.user ) {
        var post = req.post;
        post.title = req.body.title;
        post.body = req.body.body;
        post.link = req.body.link;
        if( typeof req.files.postThumbnail !== 'undefined' ) {
            // console.log( 'public/img/postThumbnails/' + post.thumbnail );
            fs.unlink( ( 'public/img/postThumbnails/' + post.thumbnail ), function( err ) {
                if( err ) {
                    throw err;
                }
                console.log( 'successfully deleted /public/img/postThumbnails/' + post.thumbnail );
            } );
            post.thumbnail = req.files.postThumbnail.name;
        } else {
        }
        post.save( function( err ) {
            if( err ) {
                return res.status( 400 ).send( {
                    message: getErrorMessage( err )
                });
            } else {
                res.redirect( '/' );
            }
        })
    } else {
        res.redirect( '/' );
    }
}

exports.delete = function( req, res ) {
    if( req.session.passport.user ) {
        var post = req.post;
        console.log( post );
        fs.unlink( ( 'public/img/postThumbnails/' + post.thumbnail ), function( err ) {
            if( err ) {
                throw err;
            }
            console.log( 'successfully deleted /public/img/postThumbnails/' + post.thumbnail );
        } );
        post.remove( function( err ) {
            if( err ) {
                return res.status( 400 ).send( {
                    message: getErrorMessage( err )
                });
            } else {
                res.redirect( '/' );
            }
        })
    } else {
        res.redirect( '/' );
    }
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
