var User = require( 'mongoose' ).model( 'User' );

exports.renderStaging = function( req, res ) {
    console.log( req.session );
    res.render( 'staging', {
        admin: ( req.session.passport.user ) ? true : false
    });
}

exports.renderSignin = function( req, res ) {
    if( req.session.passport.user ) {
        res.redirect( 'signout' );
    } else {
        res.render( 'signin', {
            messages: {},
            admin: false
        });
    }
}

exports.renderSignup = function( req, res ) {
    res.render( 'signup', {
        messages: {},
        admin: true
    });
}

exports.renderSignout = function( req, res ) {
    if( req.session.passport.user ) {
        res.render( 'signout', {
            admin: true
        });
    } else {
        res.redirect( '/' );
    }
}

exports.create = function( req, res, next ) {
    // if( req.session.passport.user ) {
        var newUser = new User( req.body );
        newUser.save( function( err ) {
            if( err ) {
                return res.status( 400 ).send( {
                    message: getErrorMessage( err )
                });
            } else {
                console.log( newUser );
                res.redirect( '/' );
            }
        });
    // } else {
    //     redirect( '/signin' );
    // }
};

exports.signout = function( req, res ) {
    req.logout();
    res.redirect( '/' );
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
