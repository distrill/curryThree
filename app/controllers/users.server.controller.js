var User = require( 'mongoose' ).model( 'User' );

exports.renderStaging = function( req, res ) {
    res.render( 'staging', {} );
}

exports.create = function( req, res, next ) {
    var newUser = new User( req.body );
    newUser.save( function( err ) {
        if( err ) {
            return res.status( 400 ).send( {
                message: getErrorMessage( err )
            });
        } else {
            console.log( newUser );
        }
    });
};

exports.userByID = function( req, res, next, id ) {
    User.findOne( {
        _id: id
    }, function( err, user ) {
        if( err ) {
            return next( err );
        } else {
            req.user = user;
            next();
        }
    });
};

exports.tempRead = function( req, res ) {
    res.json( req.user );
}

function getErrorMessage( err ) {
    if( err.errors ) {
        for( var errName in err.errors ) {
            if( err.errors[ errName ].message ) return err.errors[ errName ].message;
        }
    } else {
        return 'Unknown server error :(';
    }
};
