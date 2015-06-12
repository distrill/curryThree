var mongoose = require( 'mongoose' ),
    crypto = require( 'crypto' ),
    Schema = mongoose.Schema;

var UserSchema = new Schema( {
    username: String,
    password: String,
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
});

UserSchema.pre( 'save', function( next ) {
    if( this.password ) {
        this.salt = new
            Buffer( crypto.randomBytes( 16 ).toString( 'base64' ), 'base64' );
        this.password = this.hashPassword( this.password );
    }
    next();
});

UserSchema.methods.hashPassword = function( password ) {
    return crypto.pbkdf2Sync( password, this.salt, 10000, 64 ).toString( 'base64' );
};

UserSchema.methods.authenticate = function( password ) {
    return this.password === this.hashPassword( password );
};

mongoose.model( 'User', UserSchema );
