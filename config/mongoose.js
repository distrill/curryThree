var config = require( './config' ),
    mongoose = require( 'mongoose' );

module.exports = function() {
    var db = mongoose.connect( config.db );

    require( '../app/models/post.server.model.js' );
    require( '../app/models/user.server.model.js' );

    return db;
}
