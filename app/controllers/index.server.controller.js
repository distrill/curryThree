var post = require( 'mongoose' ).model( 'Post' );

exports.render = function( req, res ) {
    console.log( req.session );
    console.log( req.session.passport.user );
    if( req.session.lastVisit ) {
        console.log( 'Previous Session:\n' + req.session.lastVisit );
    }
    req.session.lastVisit = new Date();
    post.find( {} ).find( function( err, postResults ) {
        if( err ) {
            console.log( 'ERROR index.server.controller.js: ' + err );
        } else {
            for( var i in postResults ) {
                console.log( Date.parse( postResults[ i ].date ));
            }
            res.render( 'index', {
                posts: postResults.sort( function( a, b ) {
                    return ( Date.parse( b.date ) - Date.parse( a.date ));
                }),
                admin: ( req.session.passport.user ) ? true : false
            });
        }
    });
}

exports.renderStaging = function( req, res ) {
    console.log( req.session );
    console.log( req.session.passport.user );
    if( req.session.lastVisit ) {
        console.log( 'Previous Session:\n' + req.session.lastVisit );
    }
    req.session.lastVisit = new Date();
    post.find( {} ).find( function( err, postResults ) {
        if( err ) {
            console.log( 'ERROR index.server.controller.js: ' + err );
        } else {
            for( var i in postResults ) {
                console.log( Date.parse( postResults[ i ].date ));
            }
            res.render( 'staging', {
                posts: postResults.sort( function( a, b ) {
                    return ( Date.parse( b.date ) - Date.parse( a.date ));
                }),
                admin: ( req.session.passport.user ) ? true : false
            });
        }
    });
}
