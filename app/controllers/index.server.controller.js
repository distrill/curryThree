var post = require( 'mongoose' ).model( 'Post' );

// exports.render = function( req, res ) {
//     post.find( {} ).find( function( err, posts ) {
//         if( err ) {
//             console.log( 'ERROR index.server.controller.js: ' + err );
//         } else {
//             console.log( posts );
//             res.render( 'index', {
//                 posts: postResults.sort( function( a, b ) {
//                     return ( Date.parse( b.date ) - Date.parse( a.date ));
//                 })
//             });
//         }
//     })
// }


exports.render = function( req, res ) {
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
                })
            });
        }
    });
}

exports.renderStaging = function( req, res ) {
    res.render( 'staging', {} );
}
